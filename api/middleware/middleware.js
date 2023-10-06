const jwt = require('jsonwebtoken')
const VehicleModel = require('../models/Vehicle')

const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

// Middleware to verify JWT token for authentication
function authenticateToken(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }

    req.user = decodedToken
    next()
  })
}

// Middleware to check if the user is the owner of a vehicle
async function checkOwnership(req, res, next) {
  try {
    const { id } = req.params

    const vehicleDoc = await VehicleModel.findById(id)

    if (!vehicleDoc) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }

    const isOwner =
      JSON.stringify(vehicleDoc.owner) === JSON.stringify(req.user.id)

    if (!isOwner) {
      return res
        .status(403)
        .json({ error: 'Forbidden: You are not the owner of this vehicle' })
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  authenticateToken,
  checkOwnership,
  uploadMiddleware,
}
