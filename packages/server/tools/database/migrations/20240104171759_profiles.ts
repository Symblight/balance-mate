import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("profiles", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("provider_user_id").unique().notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("profiles");
}
