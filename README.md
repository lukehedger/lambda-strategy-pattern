# strategy-pattern

Implementation of the Strategy Pattern on AWS Lambda

## Prerequisites

- [Install Bun](https://bun.sh/)
- [Publish Bun runtime Lambda layer](https://github.com/oven-sh/bun/blob/main/packages/bun-lambda/README.md#setup)

## Develop

To start a local Bun server, run `bun index.ts`

Or, to enable hot reloading run `bun --hot index.ts`

### Test

To test the function locally, run `curl -X POST -H "Content-Type: application/json" -d '{"type": "scheme"}' http://localhost:3000`

To execute automated tests, run `bun test`

## Deploy

Run `bunx cdk deploy` to deploy the CDK stack to your AWS account.

### Watch mode

To enable hot reloading for the deployed function and infrastructure, run `bunx cdk watch --hotswap`

This will also print live logs from the function to stdout.

NOTE: You can view live logs from the function (without running CDK watch mode) by running `aws logs tail /aws/lambda/strategy-pattern --follow`

### Test

To test the deployed function, run `curl -X POST -H "Content-Type: application/json" -d '{"type": "scheme"}' <API_GATEWAY_URL>`
