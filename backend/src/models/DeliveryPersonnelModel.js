import mongoose from "mongoose";

const personnelSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    store_id: {
      type: String,
      ref: "Store",
      required: true,
    },
  },
  { collection: "delivery_pickup_agents" }
);

personnelSchema.methods.checkPassword = async function (password) {
  return this.password === password;
};

const DeliveryPersonnel = mongoose.model("DeliveryPersonnel", personnelSchema);

export default DeliveryPersonnel;
