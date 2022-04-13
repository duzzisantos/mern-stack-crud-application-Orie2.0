module.exports = (app) => {
  const register = require("../controllers/register");
  var router = require("express").Router();
  const fs = require("fs"),
    multer = require("multer");
  const db = require("../models");
  router.post("/", register.create);

  //Multer Image storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
  });

  router.post("/register/photos", upload.single("photos"), (req, res) => {
    let photos = fs.readFileSync(req.files.path);
    let encode_photo = photos.toString("base64");
    res.send(req.files);
    let final_img = {
      contentType: req.file.mimetype,
      image: Buffer.from(encode_photo, "base64"),
    };
    db.create(final_img, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.photos.Buffer);
        console.log(req.files);
        console.log("Photos saved to database");
        res.contentType(final_img.contentType);
        res.send(final_img.image);
      }
    });
  });

  //multer stuff end here

  router.get("/", register.findAll);
  router.get("/:id", register.findOne);
  router.put("/:id", register.update);
  router.delete("/:id", register.delete);
  router.delete("/", register.deleteAll);
  app.use("/register", router);
};
