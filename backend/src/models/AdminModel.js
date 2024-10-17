import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "admins" }
);

adminSchema.methods.checkPassword = async function (password) {
  return this.password === password;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
