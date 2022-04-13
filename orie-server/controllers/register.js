const db = require("../models");
const Registered = db.register;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "File cannot be empty" });
    return;
  }

  //Create
  const registered = new Registered({
    ID: req.body.ID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    businessName: req.body.businessName,
    address: req.body.address,
    email: req.body.email,
    businessPhone: req.body.businessPhone,
    category: req.body.category,
    photos: req.body.photos,
  });

  registered
    .save(registered)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: err.message || "Error in registering new vendor" });
    });
};

//Read (all data)
exports.findAll = (req, res) => {
  const vendorID = req.query.ID;
  var condition = vendorID
    ? { vendorID: { $regex: new RegExp(vendorID), $options: "i" } }
    : {};
  Registered.find(condition)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: err.message || "Error in retrieving all vendors" });
    });
};

//Read (by ID)

exports.findOne = (req, res) => {
  const id = req.params._id;
  Registered.findById(id).then((data) => {
    !data
      ? res.status(500).json({ message: `Vendor not found!` })
      : res.json(data);
  });
};

//Update
exports.update = (req, res) => {
  const id = req.params._id;

  Registered.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.status(200).json(data);
      console.log(
        `Vendor information was updated successfully!`
      );
    }
  });
};

//Delete (One)
exports.delete = (req, res) => {
  const id = req.params.id;
  Registered.findByIdAndRemove(id)
    .then((data) => {
      !data
        ? res.status(404).json({ message: `ID ${id} not found!` })
        : res
            .status(200)
            .json(data);
            console.log("Vendor information was deleted successfully!")
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error in removing vendor information!" || err.message,
      });
    });
};

//Delete (All) - Dangerous!
exports.deleteAll = (req, res) => {
  Registered.deleteMany({})
    .then((data) => {
      res.status(200).json({
        message: "All vendors have been deleted!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Error occured in deleting all vendor information!",
      });
    });
};
