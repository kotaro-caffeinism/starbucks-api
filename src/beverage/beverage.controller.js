const beverageModel = require("./beverage.model");

module.exports = {
  async index(req, res) {
    const beverages = await beverageModel.getAll();
    res.render("pages/beverages/index", {
      beverages,
    });
  },
};
