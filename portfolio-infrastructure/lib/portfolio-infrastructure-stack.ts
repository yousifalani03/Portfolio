import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1) Create S3 bucket with versioning for better deployment safety
    const websiteBucket = new s3.Bucket(this, 'PortfolioBucket', {
      bucketName: 'yousif-portfolio-site-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: true, // Enable versioning for rollback capability
    });

    // 2) Origin Access Identity (OAI) - older but widely supported method
    const oai = new cloudfront.OriginAccessIdentity(this, 'PortfolioOAI', {
      comment: 'Portfolio S3 bucket access',
    });

    // 3) CloudFront Distribution with improved caching and error handling
    const distribution = new cloudfront.Distribution(this, 'PortfolioDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, {
          originAccessIdentity: oai,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      // Additional behaviors for better Next.js support
      additionalBehaviors: {
        '/api/*': {
          origin: new origins.S3Origin(websiteBucket, {
            originAccessIdentity: oai,
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED, // Don't cache API routes
        },
        '/_next/static/*': {
          origin: new origins.S3Origin(websiteBucket, {
            originAccessIdentity: oai,
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED_FOR_UNCOMPRESSED_OBJECTS,
        },
      },
      defaultRootObject: 'index.html',
      // Custom error responses for SPA routing
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
      comment: 'Portfolio CloudFront Distribution',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // Cost optimization
    });

    // 4) Import the GitHub secret FIRST
    const githubSecret = secretsmanager.Secret.fromSecretCompleteArn(
      this,
      'GithubSecret',
      'arn:aws:secretsmanager:us-west-1:075212637045:secret:github-oauth-yousif-5NDibZ'
    );

    // 5) Create IAM role for CodeBuild with GitHub secret access
    const codeBuildRole = new iam.Role(this, 'CodeBuildServiceRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
      ],
      inlinePolicies: {
        GitHubSecretAccess: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['secretsmanager:GetSecretValue'],
              resources: [githubSecret.secretArn],
            }),
          ],
        }),
      },
    });

    // 6) Create CodeBuild project with the custom role
    const project = new codebuild.Project(this, 'PortfolioBuildProject', {
      projectName: 'portfolio-build',
      description: 'Build and deploy portfolio website',
      role: codeBuildRole, // Use the custom role
      
      source: codebuild.Source.gitHub({
        owner: 'yousifalani03',             
        repo: 'Portfolio',         
        webhook: true,                      
        webhookFilters: [
          codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIs('main'),
        ],
      }),
      
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
        computeType: codebuild.ComputeType.SMALL, // Cost optimization
        privileged: false, // Not needed for this build
      },
      environmentVariables: {
        BUCKET_NAME: { value: websiteBucket.bucketName },
        CLOUDFRONT_ID: { value: distribution.distributionId },
        NODE_ENV: { value: 'production' },
      },
      
      
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            'runtime-versions': {
              nodejs: '18',
            },
            commands: [
              'echo Installing dependencies...',
              "cd portfolio",
              'npm install',
              "npm install --save-dev typescript"
            ],
          },
          pre_build: {
            commands: [
              'echo Logging in to AWS...',
              'aws --version',
              'echo Build started on `date`',
              'echo Current directory is: $(pwd)',
              'ls -la',
            ],
          },
          build: {
            commands: [
              'echo Building the application...',
              'npm run build',
              'echo Build completed on `date`',
            ],
          },
          post_build: {
            commands: [
              'echo Deploying to S3...',
              'aws s3 sync out/ s3://$BUCKET_NAME --delete --cache-control max-age=31536000,public',
              'aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html',
              'echo Creating CloudFront invalidation...',
              'aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"',
              'echo Deployment completed on `date`',
            ],
          },
        },
        artifacts: {
          files: ['**/*'],
          'base-directory': 'out',
        },
      }),

      timeout: cdk.Duration.minutes(20), // Reasonable timeout
    });

    // Grant CloudFront access to the S3 bucket via OAI
    websiteBucket.grantRead(oai);
    websiteBucket.grantReadWrite(project);
    
    // CloudFront invalidation permissions
    project.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'cloudfront:CreateInvalidation',
        'cloudfront:GetInvalidation',
        'cloudfront:ListInvalidations',
      ],
      resources: [
        `arn:aws:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${distribution.distributionId}`,
      ],
    }));

    // Additional S3 permissions for better cache control
    project.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:PutObjectAcl',
        's3:PutObjectVersionAcl',
      ],
      resources: [websiteBucket.arnForObjects('*')],
    }));

    // 7) CDK Outputs with more useful information
    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
      description: 'S3 bucket name for website hosting',
      exportName: `${this.stackName}-BucketName`,
    });

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.domainName}`,
      description: 'CloudFront distribution URL',
      exportName: `${this.stackName}-CloudFrontURL`,
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID for manual invalidations',
      exportName: `${this.stackName}-DistributionId`,
    });

    new cdk.CfnOutput(this, 'CodeBuildProjectName', {
      value: project.projectName,
      description: 'CodeBuild project name for manual builds',
      exportName: `${this.stackName}-CodeBuildProject`,
    });
  }
}