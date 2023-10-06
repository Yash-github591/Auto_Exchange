import React, { useEffect, useState } from 'react'
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
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditVehicle() {
  const { id } = useParams()
  const [redirect, setRedirect] = useState(false)
  const [model, setModel] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [mileage, setMileage] = useState('')
  const [age, setAge] = useState('')
  const [engineCapacity, setEngineCapacity] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [location, setLocation] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const BASE_URL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles/${id}`)
      .then((response) => {
        const vehicleInfo = response.data
        setModel(vehicleInfo.model)
        setDescription(vehicleInfo.description)
        setPrice(vehicleInfo.price)
        setMileage(vehicleInfo.mileage)
        setAge(vehicleInfo.age)
        setEngineCapacity(vehicleInfo.engineCapacity)
        setFuelType(vehicleInfo.fuelType)
        setLocation(vehicleInfo.location)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  async function updateVehicle(event) {
    event.preventDefault()
    const data = new FormData()
    data.set('model', model)
    data.set('description', description)
    data.set('price', price)
    data.set('mileage', mileage)
    data.set('age', age)
    data.set('engineCapacity', engineCapacity)
    data.set('fuelType', fuelType)
    data.set('location', location)
    data.set('id', id)

    if (coverImage?.[0]) {
      data.set('coverImage', coverImage[0])
    }

    axios
      .put(`${BASE_URL}/vehicles`, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Edit Vehicle
        </Typography>
        <form onSubmit={updateVehicle}>
          <TextField
            fullWidth
            label="Model"
            variant="outlined"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mileage"
            variant="outlined"
            value={mileage}
            onChange={(event) => setMileage(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Engine Capacity"
            variant="outlined"
            value={engineCapacity}
            onChange={(event) => setEngineCapacity(event.target.value)}
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Fuel Type</InputLabel>
            <Select
              value={fuelType}
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
          <input
            type="file"
            accept="image/*"
            onChange={(ev) => setCoverImage(ev.target.files)}
            style={{ display: 'none' }}
            id="cover-image"
          />
          <label htmlFor="cover-image">
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
            Update Vehicle
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default EditVehicle
