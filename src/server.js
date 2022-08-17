const express = require("express");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api", (req, res) => {
    res.send("Welcome to Starbucks API (not official)");
  });

  return app;
};

module.exports = { setupServer };
