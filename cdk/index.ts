import { App } from "aws-cdk-lib";
import { BunLambda } from "./BunLambda";

new BunLambda(new App(), "BunLambda");
