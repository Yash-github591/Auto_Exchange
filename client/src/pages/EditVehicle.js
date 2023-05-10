import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const FormContainer = styled("form")({
  display: "block",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

const FormInput = styled(TextField)({
  marginBottom: "10px",
  marginLeft: "10px",
  marginRight: "10px",
});

const FormSelect = styled(FormControl)({
  minWidth: "120px",
  marginBottom: "10px",
  marginLeft: "10px",
  marginRight: "10px",
});

const FormButton = styled(Button)({
  marginTop: "20px",
});

function EditVehicle() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [age, setAge] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/vehicles/${id}`)
      .then((response) => {
        const vehicleInfo = response.data;
        setModel(vehicleInfo.model);
        setDescription(vehicleInfo.description);
        setPrice(vehicleInfo.price);
        setMileage(vehicleInfo.mileage);
        setAge(vehicleInfo.age);
        setEngineCapacity(vehicleInfo.engineCapacity);
        setFuelType(vehicleInfo.fuelType);
        setLocation(vehicleInfo.location);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function updateVehicle(event) {
    event.preventDefault();
    const data = new FormData();
    data.set("model", model);
    data.set("description", description);
    data.set("price", price);
    data.set("mileage", mileage);
    data.set("age", age);
    data.set("engineCapacity", engineCapacity);
    data.set("fuelType", fuelType);
    data.set("location", location);
    data.set("id", id);

    if (coverImage?.[0]) {
      data.set("coverImage", coverImage[0]);
    }

    axios
      .put(`${BASE_URL}/vehicles`, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer onSubmit={updateVehicle}>
      <FormInput
        label="Model"
        variant="outlined"
        value={model}
        onChange={(event) => setModel(event.target.value)}
      />
      <FormInput
        label="Price"
        variant="outlined"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <FormInput
        label="Mileage"
        variant="outlined"
        value={mileage}
        onChange={(event) => setMileage(event.target.value)}
      />
      <FormInput
        label="Age"
        variant="outlined"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <FormInput
        label="Engine Capacity"
        variant="outlined"
        value={engineCapacity}
        onChange={(event) => setEngineCapacity(event.target.value)}
      />
      <FormSelect variant="outlined">
        <InputLabel>Fuel Type</InputLabel>
        <Select
          value={fuelType}
          onChange={(event) => setFuelType(event.target.value)}
        >
          <MenuItem value="petrol">Petrol</MenuItem>
          <MenuItem value="diesel">Diesel</MenuItem>
          <MenuItem value="electric">Electric</MenuItem>
        </Select>
      </FormSelect>
      <FormSelect variant="outlined">
        <InputLabel>Location</InputLabel>
        <Select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        >
          <MenuItem value="Bangalore">Bangalore</MenuItem>
          <MenuItem value="Hyderabad">Hyderabad</MenuItem>
          <MenuItem value="Delhi">Delhi</MenuItem>
        </Select>
      </FormSelect>
      <FormInput
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        label="Description"
        variant="outlined"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <FormInput
        type="file"
        onChange={(ev) => setCoverImage(ev.target.files)}
      />
      <FormButton type="submit" variant="contained">
        Submit
      </FormButton>
    </FormContainer>
  );
}

export default EditVehicle;
