const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authController = require("./controllers/AuthController");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const {
  default: VehicleController,
} = require("./controllers/VehicleController");
const EmailController = require("./controllers/EmailController");

const port = process.env.PORT || 4000;

client_url = process.env.CLIENT_URL;

// connect mongoose to mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(cors({ credentials: true, origin: client_url }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(EmailController);
app.use(authController);
app.use(VehicleController);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
