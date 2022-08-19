const express = require("express");
const path = require("path");

const beverageController = require("./beverage/beverage.controller");
const adminController = require("./admin/admin.controller");

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", `${__dirname}/templates`);
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", beverageController.index);

  app.get("/admin", adminController.index);

  app.get("/admin/post", adminController.postIndex);
  app.put("/admin/post", adminController.post);

  app.get("/admin/put", adminController.putIndex);
  app.put("/admin/put", adminController.put);

  app.get("/admin/delete", adminController.deleteIndex);
  app.delete("/admin/delete", adminController.delete);

  return app;
};

module.exports = { setupServer };
