const UserSchema = require("../models/user");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: "File cannot be empty" });
    return;
  }
  const signup = new UserSchema({
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
  });
  const salt = await bcrypt.genSalt(10);
  signup.password = await bcrypt.hash(signup.password, salt);
  signup
    .save(signup)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findOne = async (req, res) => {
  const body = req.body;
  const user = await UserSchema.findOne({ username: body.username });
  if (user) {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      console.log(res.status(200).json({ message: "Successful login!" }));
      res.end()
    } else {
      console.log(
        res.status(403).json({
          error: "Access Denied! Either username or password is invalid!",
        })
      );
   
    }
  }
};
