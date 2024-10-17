import mongoose from "mongoose";

const storeInventorySchema = new mongoose.Schema(
  {
    store_id: {
      type: String,
      ref: "Store",
      required: true,
    },
    book_id: {
      type: String,
      ref: "Book",
      required: true,
    },
    cost: { type: Number, required: true },
    available_copies: { type: Number, required: true },
    total_copies: { type: Number, default: 0 },
    rack_details: {
      shelf: { type: String, required: true },
      level: { type: String, required: true },
    },
  },
  { collection: "store_inventory" }
);

const StoreInventory = mongoose.model("StoreInventory", storeInventorySchema);

export default StoreInventory;
