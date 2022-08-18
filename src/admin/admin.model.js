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

  async put(query) {
    // for (const key in query) {
    //   if (key !== "id") {
    //     await knex("beverage").where("id", data.id).update(key, data[key]);
    //   }
    // }

    console.log(query);
    for (const key in query) {
      if (key !== "id" && key !== "_method" && query[key]) {
        console.log(query.id);
        console.log(key);
        console.log(decodeURIComponent(query[key]));
        await knex("beverage")
          .where("id", +query.id)
          .update(key, decodeURIComponent(query[key]));
      }
    }
    // await knex("beverage")
    //   .where("id", query.id)
    //   .update({
    //     name: query.name ? query.name : beverage.name,
    //     shop: query.shop ? query.shop : beverage.shop,
    //     category: query.category ? query.category : beverage.category,
    //     isSeasonal: query.isSeasonal ? query.isSeasonal : beverage.isSeasonal,
    //   });

    console.log("hoge");
    return knex("beverage")
      .where("id", +query.id)
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
