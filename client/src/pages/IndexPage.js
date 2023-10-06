import { useEffect, useState, useContext } from 'react'
import Vehicle from '../components/vehicle'
import { CircularProgress, Grid } from '@mui/material'
import axios from 'axios'
import VehicleSearchBar from '../components/searchBar'
import { SearchContext } from '../context/SearchContext'

function IndexPage() {
  const [vehicles, setVehicles] = useState([])
  const [isFound, setIsFound] = useState(false)
  const { priceLow, priceHigh, location } = useContext(SearchContext)
  const BASE_URL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles`, {
        params: { priceLow, priceHigh, location },
      })
      .then((response) => {
        const vehicles = response.data
        setVehicles(vehicles)
        setIsFound(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [priceLow, priceHigh, location])

  return (
    <>
      <VehicleSearchBar />
      <Grid container spacing={2} style={{ margin: 'auto' }}>
        {(isFound === false && vehicles.length === 0 && (
          <>
            <h3 style={{ paddingLeft: '10%' }}>
              Please wait for few seconds. The free version of the server takes
              some time to start.
            </h3>
            <CircularProgress style={{ marginTop: '10%', marginLeft: '42%' }} />
          </>
        )) ||
          (isFound === true && vehicles.length === 0 && (
            <>
              <h2 style={{ paddingLeft: '15%' }}>
                No bikes found for the given price and location.
              </h2>
            </>
          )) ||
          (vehicles.length > 0 &&
            vehicles.map((vehicle) => {
              return (
                <Grid key={vehicle.id} item xs={12} sm={6} md={4} lg={4}>
                  <Vehicle {...vehicle} />
                </Grid>
              )
            }))}
      </Grid>
    </>
  )
}

export default IndexPage
