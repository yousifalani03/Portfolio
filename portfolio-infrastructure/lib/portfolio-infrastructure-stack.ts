import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { version } from 'os';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyRole = new iam.Role(this, 'AmplifyServiceRole', {
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify'),
      ],
});



    // Amplify Application
    const amplifyApp = new amplify.App(this, 'PortfolioApplication', {
      appName: 'Portfolio',
      //connect to my github repo
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'yousifalani03',
        repository: 'Portfolio',
        oauthToken: cdk.SecretValue.secretsManager('github-token')
      }),
      role: amplifyRole,
      //Build Specs
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: { //anytime there is a git push in out app, amplift will detect the changes, pull the code, 
            preBuild: { //runs the build process, and deploy the latest version of out portfolio. This will be our Continuous Integration (CI)
              commands: [
                'echo "starting this build"',
                'cd portfolio',
                'npm install'
              ],
            },
            build: {
              commands: [
                'echo "Building our nextjs App..."',
                'npm run build-and-export',
                'echo "build is completed"'
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

    })
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true
    })
 }
}
