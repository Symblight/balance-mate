import knex from "knex";
import pg from "pg";

import knexfile from "../../tools/knexfile";

export class Database {
  static knex = knex(knexfile.development);

  static pg() {
    const client = new pg.Client(knexfile.development.connection);

    return client;
  }
}
