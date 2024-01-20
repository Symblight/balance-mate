import { FastifyError } from "fastify";

import { Exception } from "./base/exception";
import createDebug from "../configs/debug";
import { ExceptionContext } from "./base/base-exception-handler";

const debug = createDebug("exceptions:negative-balance");

export class NegativeBalanceException extends Exception {
  handle(error: FastifyError, ctx: ExceptionContext) {
    debug(`NegativeBalanceException - ${error.message}`);

    return ctx.reply.status(409).send({
      status: "fail",
      message: error.message || "Negative balance",
    });
  }
}
