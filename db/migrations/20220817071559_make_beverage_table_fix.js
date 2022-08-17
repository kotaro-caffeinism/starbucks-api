/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("beverage", function (table) {
    table.increments("id").primary().notNullable();
    table.varchar("name").primary().notNullable().checkLength("<=", 30);
    table.varchar("category").notNullable().checkLength("<=", 10);
    table.varchar("shop").notNullable();
    table.boolean("isSeasonal").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("beverage");
};
