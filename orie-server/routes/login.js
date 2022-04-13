module.exports = (app) => {
  const userLogin = require("../controllers/signup");
  var router = require("express").Router();

  router.post("/", userLogin.findOne);
  app.use("/userlogsin", router);
};
