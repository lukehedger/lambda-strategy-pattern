import { type App, Stack, type StackProps } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import {
	Architecture,
	Code,
	Function as Handler,
	LayerVersion,
	Runtime,
} from "aws-cdk-lib/aws-lambda";

export const BunLambda = class extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		new LambdaRestApi(this, "BunLambdaApi", {
			handler: new Handler(this, "BunLambdaFn", {
				architecture: Architecture.ARM_64,
				code: Code.fromCustomCommand("dist", [
					"bun",
					"build",
					"--minify",
					"--outdir=dist",
					"--target=bun",
					"./index.ts",
				]),
				functionName: "bun-lambda",
				handler: "index.fetch",
				layers: [
					LayerVersion.fromLayerVersionArn(
						this,
						"BunRuntime",
						`arn:aws:lambda:${this.region}:${this.account}:layer:bun:1`,
					),
				],
				runtime: Runtime.PROVIDED_AL2,
			}),
			restApiName: "bun-lambda-api",
		});
	}
};
