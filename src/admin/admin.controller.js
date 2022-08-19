const adminModel = require("./admin.model");

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

  async post(req, res) {
    const result = await adminModel.post(req.body);
    res.json(result);
  },

  async put(req, res) {
    const result = await adminModel.put(req.query);
    res.json(result);
  },

  async delete(req, res) {
    // const result = await adminModel.delete(req.params);
    const result = await adminModel.delete(req.query);
    res.json(result);
  },
  async deleteIndex(req, res) {
    res.render("pages/admin/delete-index");
  },
};
