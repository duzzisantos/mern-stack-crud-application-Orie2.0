module.exports = (mongoose) => {
  const RegisterVendor = mongoose.model(
    "register",
    mongoose.Schema(
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
      },
      { timestamps: true }
    )
  );
  return RegisterVendor;
};
