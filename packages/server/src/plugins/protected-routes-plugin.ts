import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { ProfileDto, ProfileRepository } from "../repositories/profile";
import { Auth0UserInfo } from "../adapters/auth0";
import createDebug from "../configs/debug";

const debug = createDebug("auth:contexts");
declare module "fastify" {
  export interface FastifyInstance {
    user: {
      profile: ProfileDto;
      info: Auth0UserInfo;
    };
  }
}

export async function authValidation(request, reply) {
  const session = request.session.get("token");

  if (!session) {
    return reply.redirect("/logout");
  }
}

export const protectedAuthRoutes = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    fastify.decorateRequest("user");

    fastify.addHook("onRequest", async (request, reply) => {
      const session = request.session.get("token");

      if (!session) {
        debug("onRequest hook - User session not found. Responding with 401.");

        return reply.status(401).send({
          status: "fail",
          message: "Unauthorized: User session not found.",
        });
      }

      try {
        if (!fastify.user) {
          debug("onRequest hook - Fetching user profile...");

          const profile = await ProfileRepository.getUserInfo(
            session.access_token,
          );

          fastify.user = profile;
        }
      } catch (error) {
        debug(`onRequest hook - Error fetching user profile: ${error.message}`);

        return reply.status(401).send({
          status: "fail",
          message: "Unauthorized: User session not found.",
        });
      }
    });
  },
);
