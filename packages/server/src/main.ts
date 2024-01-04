import Fastify, { FastifyInstance } from "fastify";

import config from "config";

import createDebug from "./configs/debug";
import appPlugins from "./plugins/app-plugins";

const debug = createDebug("boost");

const port = config.get("port");

const app: FastifyInstance = Fastify({});

app.register(appPlugins);

const start = () => {
  try {
    app.listen({ port: Number(port) });
    console.log(process.env.NODE_ENV)
    debug("start");
  } catch (err) {
    app.log.error(err);
  }
};

start();
