const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const products = require("./data/products");
const ImportData = require("./DataImport");
const productRoute = require("./Routes/ProductRoutes");

const app = express();
app.use(
  cors({
    origin: "*",
    /* , methods: ["POST", "PUT"] */
  })
);
dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Connected to MongoDB");
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDatabase();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("API is running");
});
// API
app.use("/api/import", ImportData);

app.use("/api/products", productRoute);

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
