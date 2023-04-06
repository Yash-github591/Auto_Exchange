import { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardMedia, Button } from "@mui/material";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

function VehiclePage() {
  const [vehicleData, setVehicleData] = useState({});
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles/${id}`)
      .then((response) => {
        setVehicleData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function deleteVehicle() {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteVehicle/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (redirect) return <Navigate to="/" />;

  const lastUpdated = vehicleData.updatedAt
    ? formatDistanceToNow(new Date(vehicleData.updatedAt), {
        addSuffix: true,
      })
    : "";

  return (
    <Box sx={{ m: "2rem" }}>
      {userInfo &&
        vehicleData.owner &&
        userInfo.id === vehicleData.owner._id && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "80%",
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<FaTrashAlt />}
              onClick={deleteVehicle}
            />
            <Link to={`/edit/${id}`}>
              <Button
                variant="contained"
                color="info"
                startIcon={<FaEdit />}
                sx={{ ml: "8%" }}
              />
            </Link>
          </Box>
        )}

      <Card sx={{ maxWidth: "100%", my: "2rem", marginBottom: "none" }}>
        <CardMedia
          component="img"
          height="100%"
          image={`${BASE_URL}/${vehicleData.coverImage}`}
          alt=""
        />
      </Card>
      <Typography variant="h7" marginTop={"none"}>
        last updated : {lastUpdated}{" "}
      </Typography>
      <Grid container spacing={4} sx={{ mb: "2rem" }}>
        <Grid item xs={6}>
          <Typography variant="h3">{vehicleData.model}</Typography>
          <Typography variant="h5">Price: ₹{vehicleData.price}</Typography>
          <Typography variant="body1">Age: {vehicleData.age}</Typography>
          <Typography variant="body1">
            Mileage: {vehicleData.mileage}
          </Typography>
          <Typography variant="body1">
            Engine Capacity: {vehicleData.engineCapacity}
          </Typography>
          <Typography variant="body1">
            Fuel Type: {vehicleData.fuelType}
          </Typography>
          <Typography variant="body1">
            Location: {vehicleData.location}
          </Typography>
        </Grid>
        {vehicleData.owner && (
          <Grid item xs={6} marginTop="4%">
            <Typography variant="h5">
              Owner: {vehicleData.owner.username}
            </Typography>
            <Link
              to={`/sendMail/${vehicleData.owner._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2, width: "60%" }}
              >
                Contact Owner
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
      <Typography variant="h4">Description</Typography>
      <Typography variant="body1" whiteSpace="pre-wrap">
        {vehicleData.description}
      </Typography>
    </Box>
  );
}

export default VehiclePage;
