/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("beverage", (table) => {
    table.dropUnique("name");
    table.index("id");
    table.primary("id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("beverage", (table) => {
    table.dropIndex("id");
    table.index("name");
    table.dropPrimary("id");
  });
};
