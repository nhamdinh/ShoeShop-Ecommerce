const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const connectDatabase = require("./config/MongoDb");
const products = require("./data/products");
const ImportData = require("./DataImport");
const productRoute = require("./Routes/ProductRoutes");
const { errorHandler, notFound } = require("./Middleware/Errors");

const app = express();
app.use(
  cors({
    origin: "*",
    /* , methods: ["POST", "PUT"] */
  })
);
dotenv.config();
connectDatabase();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// API
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/import", ImportData);

app.use("/api/products", productRoute);

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});
// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
