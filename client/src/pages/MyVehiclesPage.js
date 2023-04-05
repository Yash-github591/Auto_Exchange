import { useContext, useEffect, useState } from "react";
import Vehicle from "../components/vehicle";
import { Grid } from "@mui/material";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function MyVehiclesPage() {
  const { userInfo } = useContext(UserContext);
  const [vehicles, setVehicles] = useState([]);
  const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

  useEffect(() => {
    if (userInfo && userInfo.id) {
      axios
        .get(`${BASE_URL}/myVehicles`, {
          params: { id: userInfo.id },
        })
        .then((response) => {
          const vehicles = response.data;
          setVehicles(vehicles);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

  return (
    <Grid container spacing={2}>
      {vehicles.length > 0 &&
        vehicles.map((vehicle) => {
          return (
            <Grid key={vehicle.id} item xs={12} sm={6} md={4} lg={4}>
              <Vehicle {...vehicle} />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default MyVehiclesPage;
