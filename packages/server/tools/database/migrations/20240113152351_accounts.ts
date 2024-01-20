import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table
      .uuid("profile_id")
      .references("profiles.id")
      .unique()
      .onDelete("CASCADE");
    table.string("account_name").notNullable();
    table.decimal("initial_balance", 10, 2).notNullable().defaultTo(0);
    table.decimal("current_balance", 10, 2).notNullable().defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}
