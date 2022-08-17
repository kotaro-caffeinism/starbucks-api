const knex = require("../knex");
const BEVERAGE_TABLE = "beverage";

module.exports = {
  BEVERAGE_TABLE,

  getAll(limit = 20) {
    return knex
      .select({
        id: "id",
        name: "name",
        category: "category",
        shop: "shop",
        isSeasonal: "isSeasonal",
      })
      .from(BEVERAGE_TABLE)
      .limit(limit);
  },
};
