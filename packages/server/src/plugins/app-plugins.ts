import path from "node:path";
import { FastifyInstance } from "fastify";

import { postgresPlugin } from "./postgres";

import routes from "../routes/routes";

const staticPath = path.join(__dirname, "../../public");

export default async function appPlugins(fastify: FastifyInstance) {
  // Register the plugins
  fastify.register(postgresPlugin);

  fastify.register(routes, { prefix: "/api/" });

  fastify.register(require("@fastify/static"), {
    root: staticPath,
  });
}
