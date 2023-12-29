module.exports = (app) => {
  var router = require("express").Router();
  const user = require("../models/user");

  router.post("/", user.create);
  app.use("/api/signup", router);
};
