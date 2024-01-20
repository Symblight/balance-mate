import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.uuid("account_id").references("accounts.id").onDelete("CASCADE");
    table.decimal("amount", 10, 2).notNullable();
    table.string("description", 255);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
