module.exports = (app) => {
  const userSignsUp = require("../controllers/signup");
  var router = require("express").Router();

  router.post("/", userSignsUp.create);
  app.use("/usersignsup", router);
};
