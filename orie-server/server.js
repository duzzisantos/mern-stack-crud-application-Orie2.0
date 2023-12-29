require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const db = require("./models");
const helmet = require("helmet");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser"),
  fs = require("fs"),
  multer = require("multer");

//database connection settings
db.mongoose
  .connect(db.url ?? process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Orie database connected successfully!");
  })
  .catch((err) => {
    if (err) {
      console.log(
        "Orie database could not connect. Check parameters again!",
        err
      );
      process.exit();
    }
  });
var corsOptions = {
  origin: "http://localhost:8080",
};

//s*8#e%^#c*/u65)r(_+i@#t*/*/(y@^& parameters
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "http://localhost:3000/"], //only scripts from this host
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      upgradeInsecureRequests: [],
      objectSrc: ["'none'"],
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy());
app.use(
  helmet.referrerPolicy({
    options: "no referrer",
  })
);

//https settings for secure connections
app.use(
  helmet.hsts({
    maxAge: 15552000,
    preload: true,
    includeSubDomains: false,
  })
);

app.use(helmet.noSniff()); //mitigates data sniffing by hackers
app.use(helmet.xssFilter()); //prevents cross-site scripting

app.post("/menu", (req, res) => {
  res.render("menu");
});

app.get("/", (req, res) => {
  res.json({
    message: "Orie backend server: gets all data from server!",
    Author: "Duzie Uche-Abba",
  });
});

//http requests

//Multer Image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.post("/register/photos", upload.single("photos"), (req, res, next) => {
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

//Multer ends here

//REST API routes
require("./routes/register")(app);
require("./routes/signup")(app);
// require("./routes/login")(app);

const PORT = 8080;
app.listen(PORT, (err) => {
  !err ? console.log("LISTENING TO PORT", PORT) : console.log(err);
});
