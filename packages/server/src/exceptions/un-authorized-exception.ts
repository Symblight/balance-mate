import { FastifyError } from "fastify";

import { Exception } from "./base/exception";
import createDebug from "../configs/debug";
import { ExceptionContext } from "./base/base-exception-handler";

const debug = createDebug("exceptions:unauth");

export class UnauthorizedException extends Exception {
  handle(error: FastifyError, ctx: ExceptionContext) {
    debug(`UnauthorizedException - ${error.message}`);

    return ctx.reply.status(401).send({
      status: "fail",
      message: "Unauthorized: User session not found.",
    });
  }
}
