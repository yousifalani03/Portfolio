import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create minimal IAM role for free tier usage
    const amplifyRole = new iam.Role(this, 'AmplifyRole', {
      roleName: 'AmplifyRole-' + this.stackName,
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('amplify.amazonaws.com'),
        new iam.ServicePrincipal('codebuild.amazonaws.com')
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify'),
      ],
      inlinePolicies: {
        MinimalAmplifyAccess: new iam.PolicyDocument({
          statements: [
            // Only essential permissions for free tier
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'amplify:*',
                'codebuild:CreateProject',
                'codebuild:StartBuild',
                'codebuild:BatchGetBuilds',
                'secretsmanager:GetSecretValue',
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
                'sts:AssumeRole'
              ],
              resources: ['*'],
            }),
          ],
        }),
      },
    });

    // Add minimal trust policy
    amplifyRole.assumeRolePolicy?.addStatements(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [
          new iam.ServicePrincipal('amplify.amazonaws.com'),
          new iam.ServicePrincipal('codebuild.amazonaws.com')
        ],
        actions: ['sts:AssumeRole'],
      })
    );

    // Create Amplify app with explicit configuration
    const amplifyApp = new amplify.App(this, 'PortfolioApp', {
      appName: 'Portfolio-' + this.stackName,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'yousifalani03',
        repository: 'Portfolio',
        oauthToken: cdk.SecretValue.secretsManager('github-token', {
          jsonField: undefined // Use the raw secret value
        })
      }),
      role: amplifyRole,
      autoBranchCreation: {
        autoBuild: false, // Prevent extra builds that cost money
      },
      environmentVariables: {
        // Use default Node.js to avoid extra charges
        'NODE_ENV': 'production',
        'AMPLIFY_MONOREPO_APP_ROOT': 'portfolio',
      },
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'cd portfolio',
                'npm ci --prefer-offline --no-audit --silent'
              ],
            },
            build: {
              commands: [
                'npm run build-and-export'
              ],
            },
          },
          artifacts: {
            baseDirectory: 'portfolio/out',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'node_modules/**/*',
              '.next/cache/**/*'
            ]
          }
        }
      })
    });

    // Create main branch with explicit settings
    const mainBranch = amplifyApp.addBranch('main', {
      branchName: 'main',
      autoBuild: true,
      stage: 'PRODUCTION',
      environmentVariables: {
        'NODE_ENV': 'production',
      }
    });

    // Add domain if needed (commented out for now)
    // const domain = amplifyApp.addDomain('yourdomain.com');
    // domain.mapRoot(mainBranch);

    // Outputs for debugging
    new cdk.CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.appId,
      description: 'Amplify App ID',
      exportName: `${this.stackName}-AppId`
    });

    new cdk.CfnOutput(this, 'AmplifyAppUrl', {
      value: `https://main.${amplifyApp.defaultDomain}`,
      description: 'Amplify App URL',
      exportName: `${this.stackName}-AppUrl`
    });

    new cdk.CfnOutput(this, 'AmplifyRoleArn', {
      value: amplifyRole.roleArn,
      description: 'Amplify Service Role ARN',
      exportName: `${this.stackName}-RoleArn`
    });
  }
}