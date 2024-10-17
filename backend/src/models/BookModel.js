import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true },
    cover_image: { type: String },
  },
  { collection: "books" }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
