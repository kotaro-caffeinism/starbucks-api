const adminModel = require("./admin.model");
// const knex = require("../knex");
// const BEVERAGE_TABLE = "beverage";

module.exports = {
  async index(req, res) {
    const beverages = await adminModel.getAll();
    res.render("pages/admin/index", {
      beverages,
    });
  },

  async postIndex(req, res) {
    // console.log("index を開きました");
    res.render("pages/admin/post-index");
  },

  async putIndex(req, res) {
    res.render("pages/admin/put-index");
  },

  // async putResult(req, res) {
  //   res.render(req.body);
  // },

  async post(req, res) {
    const result = await adminModel.post(req.body);
    res.json(result);
  },

  async put(req, res) {
    // res.render("pages/admin/put-index");
    // console.log("req.params", req.params); // 正常に動作しているページでもコンソールはできないみたい
    // console.log("req.body", req.body);
    // const result = await adminModel.put(req.body);
    // res.json(result);
    // http://localhost:3000/admin/put?_method=PUT&id=13&name=%E5%87%BA%E6%B1%81%E9%86%A4%E6%B2%B9&category=&shop=&isSeasonal=
    // http://localhost:3000/admin/put?_method=put&id=13&name=%E5%87%BA%E6%B1%81%E9%86%A4%E6%B2%B9&category=2&shop=2&isSeasonal=false
    // console.log({ "req.query": req.query });
    // res.send(req.query);
    const result = await adminModel.put(req.query);
    res.json(result);
  },

  async delete(req, res) {
    const result = await adminModel.delete(req.params);
    res.json(result);
  },
};
