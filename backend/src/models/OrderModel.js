import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
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
    books_ordered: [
      {
        book_id: {
          type: String,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number },
        inventory_id: {
          type: String,
          ref: "StoreInventory",
        },
        title: { type: String, ref: "StoreInventory" },
        store_id: { type: String, ref: "Store" },
      },
    ],
    total_amount: { type: Number, required: true },
    order_date: { type: String },
    order_status: {
      type: String,
      default: "Pending",
    },
    payment_status: {
      type: String,
    },
    agent_id: {
      type: String,
      ref: "DeliveryPersonnel",
    },
  },
  { collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
