import { useState } from 'react'
import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Paper,
} from '@mui/material'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function VehicleForm() {
  const [redirect, setRedirect] = useState(false)
  const [model, setModel] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [mileage, setMileage] = useState('')
  const [age, setAge] = useState('')
  const [engineCapacity, setEngineCapacity] = useState('')
  const [fuelType, setFuelType] = useState('petrol')
  const [location, setLocation] = useState('Bangalore')
  const [coverImage, setCoverImage] = useState(null)
  const BASE_URL = process.env.REACT_APP_BASE_URL

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set('model', model)
    formData.set('description', description)
    formData.set('price', price)
    formData.set('mileage', mileage)
    formData.set('age', age)
    formData.set('engineCapacity', engineCapacity)
    formData.set('fuelType', fuelType)
    formData.set('location', location)
    formData.set('coverImage', coverImage[0])

    try {
      const formDataJSON = {}
      for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value
      }

      const response = await axios.post(`${BASE_URL}/addVehicle`, formData, {
        withCredentials: true,
      })
      if (response.status === 200) {
        console.log('Vehicle added successfully')
        setRedirect(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Add Vehicle
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Model"
            variant="outlined"
            value={model}
            required={true}
            onChange={(event) => setModel(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={price}
            required={true}
            onChange={(event) => setPrice(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mileage"
            variant="outlined"
            value={mileage}
            required={true}
            onChange={(event) => setMileage(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            value={age}
            required={true}
            onChange={(event) => setAge(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Engine Capacity"
            variant="outlined"
            value={engineCapacity}
            required={true}
            onChange={(event) => setEngineCapacity(event.target.value)}
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Fuel Type</InputLabel>
            <Select
              value={fuelType}
              required={true}
              onChange={(event) => setFuelType(event.target.value)}
              label="Fuel Type"
            >
              <MenuItem value="petrol">Petrol</MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
              <MenuItem value="electric">Electric</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              required={true}
              onChange={(event) => setLocation(event.target.value)}
              label="Location"
            >
              <MenuItem value="Bangalore">Bangalore</MenuItem>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            margin="normal"
          />
          <label htmlFor="cover-image">
            <input
              type="file"
              accept="image/*"
              onChange={(ev) => setCoverImage(ev.target.files)}
              style={{ display: 'none' }}
              id="cover-image"
            />
            <Button
              variant="outlined"
              color="primary"
              component="span"
              fullWidth
              margin="normal"
            >
              Upload Cover Image
            </Button>
          </label>
          {coverImage && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected cover image: {coverImage[0].name}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Vehicle
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default VehicleForm
