import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    store_id: {
      type: String,
      ref: "Store",
    },
    phone_number: { type: String }, // Added phone_number field
    city: { type: String }, // Added city field
    state: { type: String }, // Added state field
    zipcode: { type: String }, // Added zipcode field
    status: { type: String }, // Added zipcode field
    ssn: { type: String }, // Added ssn field
    dob: { type: Date }, // Added dob field
    is_password_changed: { type: String },
  },
  { collection: "staff" }
);

staffSchema.methods.checkPassword = async function (password) {
  return this.password === password;
};

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
