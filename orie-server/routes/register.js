module.exports = (app) => {
  var router = require("express").Router();
  const registration = require("../controllers/register");

  router.post("/", registration.create);
  router.get("/", registration.findAll);
  app.use("/api/register", router);
};
