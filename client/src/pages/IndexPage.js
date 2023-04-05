import { useEffect, useState, useContext } from "react";
import Vehicle from "../components/vehicle";
import { Grid } from "@mui/material";
import axios from "axios";
import VehicleSearchBar from "../components/searchBar";
import { SearchContext } from "../context/SearchContext";

function IndexPage() {
  const [vehicles, setVehicles] = useState([]);
  const { priceLow, priceHigh, location } = useContext(SearchContext);
  const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles`, {
        params: { priceLow, priceHigh, location },
      })
      .then((response) => {
        const vehicles = response.data;
        setVehicles(vehicles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [priceLow, priceHigh, location]);

  return (
    <>
      <VehicleSearchBar />
      <Grid container spacing={2} style={{ margin: "auto" }}>
        {vehicles.length > 0 &&
          vehicles.map((vehicle) => {
            return (
              <Grid key={vehicle.id} item xs={12} sm={6} md={4} lg={4}>
                <Vehicle {...vehicle} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default IndexPage;
