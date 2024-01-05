import path from "node:path";
import { FastifyInstance } from "fastify";
import staticPlugin from "@fastify/static";

import { authValidation } from "./protected-routes-plugin";

const staticPath = path.join(__dirname, "../../public");

export default async function frontendContext(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    await authValidation(request, reply)
  });

  fastify.register(staticPlugin, {
    root: staticPath,
  });
}
