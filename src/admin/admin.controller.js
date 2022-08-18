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
    res.render("pages/admin/post-index");
  },

  async putIndex(req, res) {
    res.render("pages/admin/put-index");
  },

  async post(req, res) {
    const result = await adminModel.post(req.body);
    res.json(result);
  },

  async put(req, res) {
    const result = await adminModel.put(req.query);
    res.json(result);
  },

  async delete(req, res) {
    const result = await adminModel.delete(req.params);
    res.json(result);
  },
};
