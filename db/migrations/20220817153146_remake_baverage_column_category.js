/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("beverage", (table) => {
      table.dropColumn("category");
    })
    .then(() => {
      return knex.schema.alterTable("beverage", (table) => {
        table
          .integer("category")
          .references("id")
          .inTable("category")
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
    .alterTable("beverage", (table) => {
      table.dropColumn("category");
    })
    .then(() => {
      return knex.schema.alterTable("beverage", (table) => {
        table.varchar("category").notNullable().checkLength("<=", 30);
      });
    });
};
