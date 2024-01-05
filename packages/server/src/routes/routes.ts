import { FastifyInstance } from "fastify";

import profileRoutes from "./profile/profile";
import { protectedAuthRoutes } from "../plugins/protected-routes-plugin";

export default function (fastify: FastifyInstance, opt, next) {
  fastify.register(protectedAuthRoutes);
  fastify.register(profileRoutes, { prefix: "/profile" });
  next();
}
