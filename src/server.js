const express = require("express");
const path = require("path");

const beverageController = require("./beverage/beverage.controller");
const postController = require("./post/post.controller");

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", `${__dirname}/templates`);
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.render("pages/index");
  });

  // app.get("/api", (req, res) => {
  //   res.send("Welcome to Starbucks API (not official)");
  // });

  app.get("/beverages", beverageController.index);
  app.get("/post", postController.index);
  app.post("/post", postController.post);
  // app.patch()
  // app.delete()

  return app;
};

module.exports = { setupServer };
