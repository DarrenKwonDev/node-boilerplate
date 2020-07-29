const express = require("express");
const pool = require("../database");
const apiRouter = express.Router();

apiRouter.post("/add", (req, res) => {
  const { text } = req.body;
  console.log(text);
  res.redirect("/");
});

module.exports = apiRouter;
