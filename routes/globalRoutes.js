const express = require("express");
const pool = require("../database");

const globalRouter = express.Router();

globalRouter.get(["/", "/add"], (req, res) => {
  const sql = "SELECT * FROM todo";
  pool.query(sql).then((data) => {
    res.render("index", { data });
  });
});

module.exports = globalRouter;
