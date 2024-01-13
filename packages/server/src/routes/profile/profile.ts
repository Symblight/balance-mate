import { FastifyInstance } from "fastify";

import createDebug from "../../configs/debug";
import { ProfileRepository } from "../../repositories/profile";

const debug = createDebug("profiles:api");

export default function profileRoutes(fastify: FastifyInstance, opt, next) {
  fastify.get("/", async (request, reply) => {
    const session = request.session.get("token");

    try {
      const profile = await ProfileRepository.getUserInfo(session.access_token);
      debug("User profile retrieved successfully.");

      return reply.status(200).type("json").send({
        status: "ok",
        data: profile,
      });
    } catch (error) {
      debug(`Error fetching user profile: ${error.message}`);
      throw error;
    }
  });
  next();
}
