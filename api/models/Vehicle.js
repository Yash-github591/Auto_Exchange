const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const VehicleSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    model: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    age: { type: Number, required: true },
    engineCapacity: { type: Number, required: true },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric"],
      required: true,
    },
    location: {
      type: String,
      enum: ["Bangalore", "Hyderabad", "Delhi"],
    },
    coverImage: String,
  },
  {
    timestamps: true,
  }
);

const VehicleModel = model("Vehicle", VehicleSchema);
module.exports = VehicleModel;
