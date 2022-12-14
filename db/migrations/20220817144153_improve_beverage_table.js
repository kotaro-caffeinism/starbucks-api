/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("shop", (table) => {
      table.foreign("id");
    })
    .then(() => {
      return knex.schema.alterTable("beverage", (table) => {
        table
          .integer("shop")
          .references("id")
          .inTable("shop")
          .onDelete("cascade")
          .onUpdate("cascade");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("shop", (table) => {
      table.dropForeign("id");
    })
    .then(() => {
      return knex.schema("beverage", (table) => {
        table.dropColumn("shop");
      });
    });
};
