import express from "express";

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => {
  res.render("index");
});

export default globalRouter;
