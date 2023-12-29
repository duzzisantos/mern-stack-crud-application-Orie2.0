const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterVendor = new Schema(
  {
    ID: Number,
    firstName: String,
    lastName: String,
    businessName: String,
    address: String,
    email: String,
    businessPhone: Number,
    category: String,
    photos: String,
    // photos: [
    //   {
    //     _id: {
    //       type: Schema.Types.ObjectId,
    //       default: mongoose.Types.ObjectId,
    //     },
    //     url: {
    //       type: String,
    //       required: false,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("registered-business", RegisterVendor);
