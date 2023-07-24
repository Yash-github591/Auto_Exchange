import { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
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

function VehicleForm() {
  const [redirect, setRedirect] = useState(false);
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [age, setAge] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [fuelType, setFuelType] = useState("petrol");
  const [location, setLocation] = useState("Bangalore");
  const [coverImage, setCoverImage] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(); // form data is used to send files to the server along with other data in the form
    formData.set("model", model);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("mileage", mileage);
    formData.set("age", age);
    formData.set("engineCapacity", engineCapacity);
    formData.set("fuelType", fuelType);
    formData.set("location", location);
    formData.set("coverImage", coverImage[0]);

    try {
      const formDataJSON = {};
      for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
      }

      const response = await axios.post(`${BASE_URL}/addVehicle`, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Vehicle added successfully");
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormInput
        label="Model"
        variant="outlined"
        value={model}
        required={true}
        onChange={(event) => setModel(event.target.value)}
      />
      <FormInput
        label="Price"
        variant="outlined"
        value={price}
        required={true}
        onChange={(event) => setPrice(event.target.value)}
      />
      <FormInput
        label="Mileage"
        variant="outlined"
        value={mileage}
        required={true}
        onChange={(event) => setMileage(event.target.value)}
      />
      <FormInput
        label="Age"
        variant="outlined"
        value={age}
        required={true}
        onChange={(event) => setAge(event.target.value)}
      />
      <FormInput
        label="Engine Capacity"
        variant="outlined"
        value={engineCapacity}
        required={true}
        onChange={(event) => setEngineCapacity(event.target.value)}
      />
      <FormSelect variant="outlined">
        <InputLabel>Fuel Type</InputLabel>
        <Select
          value={fuelType}
          required={true}
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
          required={true}
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
        required={true}
        onChange={(ev) => setCoverImage(ev.target.files)}
      />
      <FormButton type="submit" variant="contained">
        Submit
      </FormButton>
    </FormContainer>
  );
}

export default VehicleForm;
