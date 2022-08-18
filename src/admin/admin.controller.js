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

  async put(req, res) {
    const result = await adminModel.put(req.body);
    res.json(result);
  },

  async post(req, res) {
    const result = await adminModel.post(req.body);
    res.json(result);
  },

  async delete(req, res) {
    const result = await adminModel.delete(req.params);
    res.json(result);
  },
};
