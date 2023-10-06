const VehicleModel = require('../models/Vehicle')
const fs = require('fs')

// Add a new vehicle
async function addVehicle(req, res) {
  try {
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const extension = parts[parts.length - 1]
    const newPath = path + '.' + extension
    fs.rename(path, newPath, () => {})

    const {
      model,
      price,
      mileage,
      age,
      description,
      engineCapacity,
      fuelType,
      location,
    } = req.body

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
      owner: req.user.id,
    })

    res.json(vehicleDoc)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all vehicles
async function getAllVehicles(req, res) {
  const { priceLow, priceHigh, location } = req.query

  let query = {
    price: { $gte: priceLow, $lte: priceHigh },
  }

  if (location !== '') {
    query.location = location
  }

  const vehicles = await VehicleModel.find(query)
    .populate('owner', ['username', 'email'])
    .sort({ createdAt: -1 })
    .limit(20)

  res.json(vehicles)
}

// Get all vehicles of a user
async function getMyVehicles(req, res) {
  try {
    const { id } = req.query

    const vehicles = await VehicleModel.find({ owner: id })
      .populate('owner', ['username', 'email'])
      .sort({ createdAt: -1 })
      .limit(20)

    res.json(vehicles)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get a single vehicle by ID
async function getVehicleById(req, res) {
  const { id } = req.params
  const vehicleDoc = await VehicleModel.findById(id).populate('owner', [
    'username',
    'email',
  ])
  res.json(vehicleDoc)
}

// Update a vehicle
async function updateVehicle(req, res) {
  try {
    let newPath = null

    if (req.file) {
      const { originalname, path } = req.file
      const parts = originalname.split('.')
      const extension = parts[parts.length - 1]
      newPath = path + '.' + extension
      fs.rename(path, newPath, () => {})
    }

    const {
      id, // Access the ID from req.params
      model,
      price,
      mileage,
      age,
      description,
      engineCapacity,
      fuelType,
      location,
    } = req.body

    const vehicleDoc = await VehicleModel.findById(id)

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
    })

    res.json(vehicleDoc)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a vehicle
async function deleteVehicle(req, res) {
  try {
    const { id } = req.params
    const vehicleDoc = await VehicleModel.findById(id)
    const coverImagePath = vehicleDoc.coverImage
    await vehicleDoc.deleteOne()

    if (coverImagePath) {
      fs.unlink(coverImagePath, (err) => {
        if (err) throw err
      })
    }

    res.json(vehicleDoc)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  addVehicle,
  getAllVehicles,
  getMyVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
}
