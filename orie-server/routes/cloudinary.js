
//Cloudinary
const cloudinary = require("cloudinary");
  const dotenv = require("dotenv");
  dotenv.config();

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloudinary_url: process.env.CLOUDINARY_URL,
  });

  exports.app = (file, folder) => {
      return new Promise(resolve => {
          cloudinary.uploader.upload(file, (result) => {
              resolve({
                  url: result.url,
                  id: result.public_id
              })
          }, {
              resource_type: "auto",
              folder: folder
          })
      })
  }