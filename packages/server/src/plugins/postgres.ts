import pg from "@fastify/postgres";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import config from "config";

const dbConfig: any = config.get("database");
const postgres = dbConfig.get("pg");

const databaseConfig = {
  host: postgres.get("PG_HOST"),
  port: postgres.get("PG_PORT"),
  user: postgres.get("PG_USER"),
  password: postgres.get("PG_PASSWORD"),
  database: postgres.get("PG_DB_NAME"),
};

export const postgresPlugin = fp(function (app: FastifyInstance, opt, next) {
  function createDatabaseConfig() {
    const { host, port, user, password, database } = databaseConfig;

    const dbHost =
      host === "localhost" || host === "127.0.0.1" ? `${host}:${port}` : host;
    const connectionString = `postgres://${user}:${password}@${dbHost}/${database}`;

    return connectionString;
  }

  app.register(pg, {
    connectionString: createDatabaseConfig(),
  });

  next();
});
