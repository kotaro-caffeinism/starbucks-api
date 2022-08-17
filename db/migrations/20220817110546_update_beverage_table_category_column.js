/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("beverage", (table) => {
    table.varchar("category").checkLength("<=", 30).alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("beverage", (table) => {
    table.varchar("category").checkLength("<=", 10).alter();
  });
};
