# Introduction
Our deployment pipeline relies on lambda functions during its process.
Two of those lambda functions are used to start canary runs during the blue/green deployment.

We used to be able to start the canaries using an http request. Now it is not possible anymore but we're not able to have the checkly CLI running properly in a lambda environment.

The checkly package is packaged as can be seen in the .serverless/checkly-cli-in-aws-lambda.zip file that you obtain after running the app.

# How to run the code

1. Run npm i 

2. Run the serverless app using 
```CHECKLY_API_KEY=<a valid api key> CHECKLY_ACCOUNT_ID=<a valid account id> npx serverless offline```

3. Make an http request to GET http://localhost:3000

4. Current output

```
{"errorMessage":"env: node: No such file or directory\n","errorType":"Error","stackTrace":["Error: env: node: No such file or directory","","at module.exports.handler (/Users/noste/Development/rosa-health/checkly-cli-in-aws-lambda/index.js:14:13)","at InProcessRunner.run (file:///Users/noste/Development/rosa-health/checkly-cli-in-aws-lambda/node_modules/serverless-offline/src/lambda/handler-runner/in-process-runner/InProcessRunner.js:87:20)"]}
```

Expected output

Checks should be started in the related checkly account.
