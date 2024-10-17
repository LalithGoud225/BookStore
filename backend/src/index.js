import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.SERVER_PORT || 3000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () =>
      console.log(`Server Started : http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
