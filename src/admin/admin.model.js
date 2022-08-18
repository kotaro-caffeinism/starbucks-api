const knex = require("../knex");
const BEVERAGE_TABLE = "beverage";

module.exports = {
  BEVERAGE_TABLE,

  getAll() {
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
      .orderBy("beverage.id");
  },

  async put(data) {
    for (const key in data) {
      if (key !== "id") {
        await knex("beverage").where("id", data.id).update(key, data[key]);
      }
    }
    return knex("beverage")
      .where("id", data.id)
      .select()
      .from(BEVERAGE_TABLE)
      .returning("*");
  },

  async post(data) {
    const result = await knex("beverage").insert(data, ["*"]);
    return result[0];
  },

  async delete(data) {
    return knex("beverage")
      .where("id", +data.id)
      .del(["*"]);
  },
};
