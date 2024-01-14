import { FastifyError } from "fastify";

import { Exception } from "./base/exception";
import createDebug from "../configs/debug";
import { ExceptionContext } from "./base/base-exception-handler";

const debug = createDebug("exceptions:not-found");

export class NotFoundException extends Exception {
  handle(error: FastifyError, ctx: ExceptionContext) {
    debug(`NotFoundException - ${error.message}`);

    return ctx.reply.status(404).send({
      status: "fail",
      message: error.message || "Not found.",
    });
  }
}
