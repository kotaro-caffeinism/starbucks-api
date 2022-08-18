const express = require("express");
const path = require("path");

const beverageController = require("./beverage/beverage.controller");
const postController = require("./post/post.controller");
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

  // app.get("/admin/post", adminController.postIndex);
  // app.post("/admin/post", adminController.post);

  app.get("/admin/put", adminController.putIndex);
  app.put("/admin/put", adminController.put);
  // app.post("/admin/put", (req, res) => {
  //   console.log(req.query);
  //   res.render(req.query);
  // });
  // app.put("/admin/put", (req, res) => {
  //   console.log("hoge");
  //   console.log(req.query);
  // });
  // app.put("/admin/put", adminController.put);

  app.delete("/admin/delete/:id", adminController.delete);

  return app;
};

module.exports = { setupServer };
