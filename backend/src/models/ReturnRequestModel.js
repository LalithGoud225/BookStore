import mongoose from "mongoose";

const returnRequestSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      ref: "Order",
      required: true,
    },
    customer_id: {
      type: String,
      ref: "Customer",
      required: true,
    },
    store_id: {
      type: String,
      ref: "Store",
      required: true,
    },
    return_reason: { type: String, required: true },
    return_date: { type: String },
    status: {
      type: String,
      default: "Pending",
    },
    refund_amount: { type: Number },
    agent_id: { type: String, ref: "DeliveryPersonnel" },
  },
  { collection: "return_requests" }
);

const ReturnRequest = mongoose.model("ReturnRequest", returnRequestSchema);

export default ReturnRequest;
