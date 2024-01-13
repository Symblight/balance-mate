import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { ProfileDto, ProfileRepository } from "../repositories/profile";
import createDebug from "../configs/debug";
import { UnauthorizedException } from "../exceptions/un-authorized-exception";

const debug = createDebug("auth:contexts");
declare module "fastify" {
  export interface FastifyInstance {
    user: ProfileDto;
  }
}

export async function authValidation(request, reply) {
  const session = request.session.get("token");

  if (!session) {
    debug("authValidation - User session not found. Redirecting to /logout");

    return reply.redirect("/logout");
  }
}

export const protectedAuthRoutes = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    fastify.decorateRequest("user");

    fastify.addHook("onRequest", async (request) => {
      const session = request.session.get("token");

      if (!session) {
        debug("onRequest hook - User session not found. Responding with 401.");

        throw new UnauthorizedException();
      }

      try {
        if (!fastify.user) {
          debug("onRequest hook - Fetching user profile...");

          const profile = await ProfileRepository.getProfileByAuthProviderId(
            session.sub,
          );

          fastify.user = profile;
        }
      } catch (error) {
        debug(`onRequest hook - Error fetching user profile: ${error.message}`);

        throw error;
      }
    });
  },
);
