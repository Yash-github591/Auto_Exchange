const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const AuthRoutes = require('./routes/AuthRoutes')
const EmailRoutes = require('./routes/EmailRoutes')
const vehicleRoutes = require('./routes/VehicleRoutes')
const port = process.env.PORT || 4000

require('dotenv').config()

// connect mongoose to mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err)
  })

const CLIENT_URL = process.env.CLIENT_URL

app.use(cors({ credentials: true, origin: CLIENT_URL }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(AuthRoutes)
app.use(EmailRoutes)
app.use(vehicleRoutes)

app.listen(port, () => {
  console.log('Server is running on port ', port)
})
