const express = require('express')
const VehicleController = require('../controllers/VehicleController')
const {
  addVehicle,
  getAllVehicles,
  getMyVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = VehicleController

const {
  authenticateToken,
  checkOwnership,
  uploadMiddleware,
} = require('../middleware/middleware')

const router = express.Router()

// Add a vehicle
router.post(
  '/addVehicle',
  uploadMiddleware.single('coverImage'),
  authenticateToken,
  addVehicle
)

// Get all vehicles
router.get('/vehicles', getAllVehicles)

// Get all vehicles for a specific user
router.get('/myVehicles', getMyVehicles)

// Get a vehicle by id
router.get('/vehicles/:id', getVehicleById)

// Update a vehicle
router.put(
  '/vehicles',
  uploadMiddleware.single('coverImage'),
  authenticateToken,
  checkOwnership,
  updateVehicle
)

// Delete a vehicle
router.delete(
  '/deleteVehicle/:id',
  authenticateToken,
  checkOwnership,
  deleteVehicle
)

module.exports = router
