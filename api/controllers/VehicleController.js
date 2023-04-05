const VehicleController = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const VehicleModel = require("../models/Vehicle");
const jwt = require("jsonwebtoken");

const uploadMiddleware = multer({ dest: "uploads/" });

VehicleController.post(
  "/addVehicle",
  uploadMiddleware.single("coverImage"),
  async (req, res) => {
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      const newPath = path + "." + extension;
      fs.rename(path, newPath, () => {});

      const { token } = req.cookies;
      jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {
        const {
          model,
          price,
          mileage,
          age,
          description,
          engineCapacity,
          fuelType,
          location,
        } = req.body;

        if (err) throw err;
        const vehicleDoc = await VehicleModel.create({
          model,
          price,
          mileage,
          age,
          engineCapacity,
          fuelType,
          location,
          description,
          coverImage: newPath,
          owner: info.id,
        });
        res.json(vehicleDoc);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

VehicleController.get("/vehicles", async (req, res) => {
  const { priceLow, priceHigh, location } = req.query;

  let query = {
    price: { $gte: priceLow },
    price: { $lte: priceHigh },
  };

  if (location !== "") {
    query.location = location;
  }

  const vehicles = await VehicleModel.find(query)
    .populate("owner", ["username", "email"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(vehicles);
});

VehicleController.get("/myVehicles", async (req, res) => {
  try {
    const { id } = req.query;
    const vehicles = await VehicleModel.find({ owner: id })
      .populate("owner", ["username", "email"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

VehicleController.get("/vehicles/:id", async (req, res) => {
  const { id } = req.params;
  const vehicleDoc = await VehicleModel.findById(id).populate("owner", [
    "username",
    "email",
  ]);
  res.json(vehicleDoc);
});

VehicleController.put(
  "/vehicles",
  uploadMiddleware.single("coverImage"),
  async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      newPath = path + "." + extension;
      fs.rename(path, newPath, () => {});
    }
    const {
      id,
      model,
      price,
      mileage,
      age,
      description,
      engineCapacity,
      fuelType,
      location,
    } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {
      if (err) throw err;
      const vehicleDoc = await VehicleModel.findById(id);
      const isOwner =
        JSON.stringify(vehicleDoc.owner) === JSON.stringify(info.id);
      if (!isOwner) {
        return res
          .status(400)
          .json({ error: "You are not the owner of this vehicle" });
      }
      await vehicleDoc.updateOne({
        model,
        price,
        mileage,
        age,
        engineCapacity,
        description,
        fuelType,
        location,
        coverImage: newPath || vehicleDoc.coverImage,
        owner: info.id,
      });
      res.json(vehicleDoc);
    });
  }
);

VehicleController.delete("/deleteVehicle/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {
    if (err) throw err;
    const vehicleDoc = await VehicleModel.findById(id);
    const isOwner =
      JSON.stringify(vehicleDoc.owner) === JSON.stringify(info.id);
    if (!isOwner) {
      return res
        .status(400)
        .json({ error: "You are not the owner of this vehicle" });
    }
    const coverImagePath = vehicleDoc.coverImage;
    await vehicleDoc.deleteOne();

    if (coverImagePath) {
      fs.unlink(coverImagePath, (err) => {
        if (err) throw err;
      });
    }

    res.json(vehicleDoc);
  });
});

exports.default = VehicleController;
