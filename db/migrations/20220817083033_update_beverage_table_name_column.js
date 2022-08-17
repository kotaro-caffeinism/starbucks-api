/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("beverage", (table) => {
    table.dropColumn("name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("beverage", (table) => {
    table.varchar("name").primary().notNullable().checkLength("<=", 30).alter();
  });
};
