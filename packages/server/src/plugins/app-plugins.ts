import { FastifyInstance } from "fastify";

import { auth0Plugin } from "./auth0-plugin";
import frontendContext from "./frontend-plugin";

import routes from "../routes/routes";

export default async function appPlugins(fastify: FastifyInstance) {
  // Register the plugins

  fastify.register(auth0Plugin);
  fastify.register(routes, { prefix: "/api/" });

  fastify.register(frontendContext);
}
