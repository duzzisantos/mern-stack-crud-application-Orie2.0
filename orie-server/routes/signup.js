module.exports = (app) => {
  var router = require("express").Router();
  const user = require("../controllers/signup");

  router.post("/", user.create);
  app.use("/api/signup", router);
};
