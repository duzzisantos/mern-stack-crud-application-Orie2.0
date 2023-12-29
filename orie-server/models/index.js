const dbConfig = require("../config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.register = require("./register")(mongoose);
db.user = require("./user")(mongoose);

module.exports = db;
