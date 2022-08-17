/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("beverage", (table) => {
    table.dropColumn("shop");
  });
  // .then(() => {
  //   return knex.schema.alterTable("beverage", (table) => {
  //     table
  //       .string("shop")
  //       .references("id")
  //       .inTable("shop")
  //       .onDelete("cascade")
  //       .onUpdate("cascade");
  //   });
  // });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema("beverage", (table) => {
    table.dropColumn("shop");
  });
  // .then(() => {
  //   return knex.schema.alterTable("beverage", (table) => {
  //     table.varchar("shop").notNullable();
  //   });
  // });
};
