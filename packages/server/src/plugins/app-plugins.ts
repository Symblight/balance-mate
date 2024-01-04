import path from "node:path";
import { FastifyInstance } from "fastify";
import staticPlugin from "@fastify/static"

import routes from "../routes/routes";

const staticPath = path.join(__dirname, "../../public");

export default async function appPlugins(fastify: FastifyInstance) {
  // Register the plugins

  fastify.register(routes, { prefix: "/api/" });

  fastify.register(staticPlugin, {
    root: staticPath,
  });
}
