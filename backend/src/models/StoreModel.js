import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true }, // Added city field
    zipcode: { type: String, required: true }, // Added zipcode field
    phone_number: { type: String, required: true }, // Added phone_number field
    staff_id: {
      type: String,
      ref: "Staff",
      required: true,
    },
    books_available: [
      {
        book_id: {
          type: String,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number },
      },
    ],
  },
  { collection: "stores" }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
