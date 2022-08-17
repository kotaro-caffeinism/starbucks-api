const knex = require("../knex");
const BEVERAGE_TABLE = "beverage";

module.exports = {
  BEVERAGE_TABLE,

  getAll(limit = 20) {
    return knex("beverage")
      .leftJoin("category", "beverage.category", "=", "category.id")
      .leftJoin("shop", "beverage.shop", "=", "shop.id")
      .select({
        name: "beverage.name",
        category: "category.name",
        shop: "shop.shop",
        isSeasonal: "beverage.isSeasonal",
      })
      .from(BEVERAGE_TABLE)
      .limit(limit)
      .orderBy("beverage.id");
  },
};
