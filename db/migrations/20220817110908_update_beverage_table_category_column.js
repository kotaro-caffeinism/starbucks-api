/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw(
      "ALTER TABLE beverage DROP CONSTRAINT beverage_category_1; ALTER TABLE beverage DROP CONSTRAINT beverage_category_check"
    )
    .alterTable("beverage", (table) => {
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
