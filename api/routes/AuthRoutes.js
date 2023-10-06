const express = require('express')
const authController = require('../controllers/AuthController')
const { register, login, logout, getProfile, getProfileById } = authController
const { authenticateToken } = require('../middleware/middleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authenticateToken, getProfile)
router.get('/profile/:id', getProfileById)

module.exports = router
