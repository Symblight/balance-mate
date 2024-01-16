import { FastifyInstance } from "fastify";

import createDebug from "../../configs/debug";
import { AccountRepository } from "../../repositories/account/account";

const debug = createDebug("profiles:api");

export default function accountRoutes(fastify: FastifyInstance, opt, next) {
  fastify.get("/", async (request, reply) => {
    const user = fastify.user

    try {
      const accounts = await AccountRepository.getAllByProfileId(user.id);

      return reply.status(200).type("json").send({
        status: "ok",
        data: accounts,
      });
    } catch (error) {
      debug(`Error fetching account: ${error.message}`);
      throw error;
    }
  });
  next();
}
