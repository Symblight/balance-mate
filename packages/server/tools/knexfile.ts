import path from "node:path";
process.env.NODE_CONFIG_DIR = "../config";

import config from "config";

const postgres: config.IConfig = config.get("database.pg");

const options = {
  client: "pg",
  connection: {
    host: postgres.get<string>("PG_HOST"),
    port: postgres.get<number>("PG_PORT"),
    user: postgres.get<string>("PG_USER"),
    password: postgres.get<string>("PG_PASSWORD"),
    database: postgres.get<string>("PG_DB_NAME"),
    charset: "utf8",
  },
  migrations: {
    directory: path.join(__dirname, "./database/migrations"),
    loadExtensions: [".ts"],
  },
  seeds: {
    directory: path.join(__dirname, "./database/seeders"),
    loadExtensions: [".ts"],
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: options,

  staging: {
    ...options,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    ...options,
    pool: {
      min: 2,
      max: 10,
    },
  },
};
