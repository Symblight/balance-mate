import knex from "knex";
import pg from "pg";

import knexfile from "../../tools/knexfile";

const NODE_ENV = process.env.NODE_ENV || "development";

export class Database {
  static knex = knex(knexfile[NODE_ENV]);

  static pg() {
    return new pg.Client(knexfile[NODE_ENV].connection);
  }
}
