import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifySession from "@fastify/secure-session";
import fastifyOAuth2Plugin, { OAuth2Namespace } from "@fastify/oauth2";
import config from "config";

import * as ProfileOperations from "../operations/create-profile";
import { generateBaseUrl } from "../configs/app";

const auth0Config: config.IConfig = config.get("auth0");

declare module "fastify" {
  export interface FastifyInstance {
    auth0: OAuth2Namespace;
  }
}

interface Auth0User {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
}

export const auth0Plugin = fastifyPlugin(function (
  app: FastifyInstance,
  opt,
  next,
) {
  app.register(fastifySession, {
    sessionName: "session",
    cookieName: "appSession",
    secret: config.get("COOKIE_SECRET"),
    salt: config.get("COOKIE_SALT"),
    cookie: {
      path: "/",
    },
  });

  app.register(fastifyOAuth2Plugin, {
    name: "auth0",
    credentials: {
      client: {
        id: auth0Config.get<string>("CLIENT_ID"),
        secret: auth0Config.get<string>("CLIENT_SECRET"),
      },
      auth: null,
    },
    callbackUri: generateBaseUrl(
      { host: config.get<string>("HOST"), port: config.get<number>("port") },
      "/callback",
    ).toString(),
    scope: ["openid", "profile", "offline_access", "email"],
    startRedirectPath: "/login",
    discovery: {
      issuer: auth0Config.get<string>("CLIENT_ISSUER"),
    },
  });

  // Define the callback route to handle the OAuth2 callback
  app.get("/callback", async (request, reply) => {
    const { token } =
      await app.auth0.getAccessTokenFromAuthorizationCodeFlow(request);

    const user = (await app.auth0.userinfo(token)) as Auth0User;
    await ProfileOperations.getOrCreateProfileByAuthProviderId(user.sub);

    request.session.set("token", { ...token, ...user });

    return reply.redirect("/");
  });

  // Define a logout route to clear the session or cookie
  app.get("/logout", async (request, reply) => {
    let returnURL = generateBaseUrl(
      { host: config.get("HOST"), port: config.get("port") },
      "/login",
    );

    if (returnURL.host === null) {
      throw Error(`invalid returnURL ${returnURL.toString()}`);
    }

    const endSessionParams = new URLSearchParams({
      returnTo: returnURL.toString(),
      client_id: auth0Config.get("CLIENT_ID"),
    });

    const endSessionUrl = new URL(
      "/v2/logout",
      auth0Config.get("CLIENT_ISSUER"),
    );

    endSessionUrl.search = endSessionParams.toString();
    request.session.delete();
    reply.redirect(endSessionUrl.toString());
  });

  next();
});
