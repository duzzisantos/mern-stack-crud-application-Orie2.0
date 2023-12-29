module.exports = (app) => {
  var router = require("express").Router();
  const registration = require("../models/register");

  router.post("/", registration.create);
  app.use("/api/signup", router);
};
