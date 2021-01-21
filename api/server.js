const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

dotenv.config();

//Connect to DB
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middleware for consoling every request
app.use((req, res, next) => {
  console.log(`${req.method}`.bold.green + `  ${req.originalUrl}`.dim);
  next();
});

//Routes
app.get("/", (req, res) => {
  res.json({
    welcome: "Welcome to  API",
    message: "API is running",
  });
});

//Import routes
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");

//Route middleware
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} :`.green);
});
