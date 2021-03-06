import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "vennlab2",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    hello: {
      handler: "functions/example.hello",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },
    bye: {
      handler: "functions/example.bye",
      events: [
        {
          http: {
            method: "get",
            path: "bye",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
