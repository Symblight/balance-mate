import { FastifyInstance } from "fastify";

export default function (fastify: FastifyInstance, opt, next) {
  // public routes
  next();
}
