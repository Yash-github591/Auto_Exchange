import { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

function VehiclePage() {
  const [vehicleData, setVehicleData] = useState({});
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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

      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          height="100%"
          image={`${BASE_URL}/${vehicleData.coverImage}`}
          alt=""
        />
      </Card>
      <Typography variant="h6">last updated : {lastUpdated} </Typography>
      <Card sx={{ marginTop: "3%" }}>
        <CardContent>
          <Typography variant="h4" marginBottom={"3%"}>
            {vehicleData.model}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                <b>Price: </b>₹{vehicleData.price}
              </Typography>
              <Typography variant="h6">
                <b>Age: </b>
                {vehicleData.age}
              </Typography>
              <Typography variant="h6">
                <b>Mileage: </b>
                {vehicleData.mileage}
              </Typography>
              <Typography variant="h6">
                <b>Engine Capacity: </b>
                {vehicleData.engineCapacity}
              </Typography>
              <Typography variant="h6">
                <b>Fuel Type: </b>
                {vehicleData.fuelType}
              </Typography>
              <Typography variant="h6">
                <b>Location: </b>
                {vehicleData.location}
              </Typography>
              <Typography variant="h6" whiteSpace="pre-wrap">
                <b>Description: </b>
                {vehicleData.description}
              </Typography>
            </Grid>
            {vehicleData.owner && (
              <Grid item xs={12} sm={6} marginTop="4%" paddingLeft="10%">
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
        </CardContent>
      </Card>
    </Box>
  );
}

export default VehiclePage;
