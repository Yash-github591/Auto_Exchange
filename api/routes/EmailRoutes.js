const express = require('express')
const EmailController = require('../controllers/EmailController')
const { sendMail } = EmailController
const router = express.Router()

router.post('/sendMail', sendMail)

module.exports = router
