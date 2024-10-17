import mongoose from "mongoose";

const orderPaymentSchema = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    date: { type: String },
    payment_type: { type: String, required: true },
    card_type: { type: String },
    card_number: { type: String },
    card_name: { type: String },
    expiry_month: { type: Number },
    expiry_year: { type: Number },
    cvv: { type: String },
    status: {
      type: String,
    },
  },
  { collection: "order_payments" }
);

const OrderPayment = mongoose.model("OrderPayment", orderPaymentSchema);

export default OrderPayment;
