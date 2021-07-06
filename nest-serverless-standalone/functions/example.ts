import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { Context } from "vm";

const hello: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Hello!",
      },
      null,
      2
    ),
  };
};

const bye: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "GO Bye!",
        input: event,
      },
      null,
      2
    ),
  };
};

export { hello, bye };
