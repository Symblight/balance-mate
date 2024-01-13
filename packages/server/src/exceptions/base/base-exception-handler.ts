import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export interface ExceptionContext {
  request: FastifyRequest;
  reply: FastifyReply;
}

interface ExceptionBase extends FastifyError {
  handle?: (error: FastifyError, ctx: ExceptionContext) => void;
}

export class BaseExceptionHandler {
  defaultHandler(error: FastifyError, ctx: ExceptionContext) {
    ctx.reply.status(error.statusCode).send({
      status: "fail",
      validation: error.validation,
      message: error.message,
    });
  }

  async getBaseHandle(
    error: ExceptionBase,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    if (error.handle) {
      error.handle(error, { request, reply });
    }

    return this.defaultHandler(error, { request, reply });
  }
}

const exceptions = new BaseExceptionHandler();

export const HttpExceptionHandler = exceptions.getBaseHandle;
