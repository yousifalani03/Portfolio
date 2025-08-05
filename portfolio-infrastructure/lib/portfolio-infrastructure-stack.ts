import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Amplify service role with proper trust policy
    const amplifyRole = new iam.Role(this, 'AmplifyServiceRole', {
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      description: 'Service role for AWS Amplify',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify'),
      ],
      // Add inline policy for additional permissions if needed
      inlinePolicies: {
        AmplifyDeploymentPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
              ],
              resources: ['*'],
            }),
          ],
        }),
      },
    });

    // Amplify Application
    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
      description: 'Portfolio application deployed with AWS Amplify',
      //connect to my github repo
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'yousifalani03',
        repository: 'Portfolio',
        oauthToken: cdk.SecretValue.secretsManager('github-token')
      }),
      role: amplifyRole, // Re-enabled after successful deployment
      //Build Specs
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'echo "Starting build process"',
                'cd portfolio',
                'echo "Installing dependencies..."',
                'npm ci',
              ],
            },
            build: {
              commands: [
                'echo "Building Next.js application..."',
                'npm run build',
                'echo "Build completed successfully"'
              ],
            },
          },
          artifacts: {
            baseDirectory: 'portfolio/out',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'portfolio/node_modules/**/*',
              'portfolio/.next/cache/**/*'
            ]
          }
        }
      }),
      // Add environment variables if needed
      environmentVariables: {
        '_LIVE_UPDATES': '[{"name":"Next.js","pkg":"@aws-amplify/cli-extensibility-helper","type":"feature","version":"latest"}]'
      }
    });

    // Add main branch with auto-build enabled
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true,
      branchName: 'main',
    });

    // Output the app URL for easy access
    new cdk.CfnOutput(this, 'AmplifyAppUrl', {
      value: `https://main.${amplifyApp.appId}.amplifyapp.com`,
      description: 'URL of the deployed Amplify application',
    });

    new cdk.CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.appId,
      description: 'Amplify App ID',
    });
  }
}