import { TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

  async function register(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
        alert("User created successfully");
      } else {
        alert("User creation failed");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  }

  if (redirect) {
    navigate("/");
  }

  return (
    <Box width={"90%"} mx={"auto"} maxWidth={"400px"}>
      <form className="login" onSubmit={register}>
        <Typography mt={"5%"} textAlign={"center"} fontSize={"150%"}>
          Register
        </Typography>
        <TextField
          fullWidth
          margin={"normal"}
          label="Username"
          variant="outlined"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <TextField
          fullWidth
          margin={"normal"}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <TextField
          fullWidth
          margin={"normal"}
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterPage;
