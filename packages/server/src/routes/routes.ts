import { FastifyInstance } from "fastify";

import profileRoutes from "./profile/profile";
import { protectedAuthRoutes } from "../plugins/protected-routes-plugin";
import accountRoutes from "./account/account";
import transactionRoutes from "./transactions/transactions";

export default function (fastify: FastifyInstance, opt, next) {
  fastify.register(protectedAuthRoutes);
  fastify.register(profileRoutes, { prefix: "/profile" });
  fastify.register(accountRoutes, { prefix: "/accounts" });
  fastify.register(transactionRoutes, { prefix: "/transactions" });
  next();
}
