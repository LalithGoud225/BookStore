import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true }, // Add state field
    city: { type: String, required: true }, // Add city field
    zipcode: { type: String, required: true }, // Add zipcode field
    dob: { type: Date, required: true }, // Add dob field as Date type
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Assuming Order is another mongoose model
  },
  { collection: "customers" }
);

customerSchema.methods.checkPassword = async function (password) {
  return this.password === password;
};

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
