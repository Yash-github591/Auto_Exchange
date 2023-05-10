import { TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function login(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
      } else {
        alert("wrong credentials");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Box width={"90%"} mx={"auto"} maxWidth={"400px"}>
      <form className="login" onSubmit={login} autoComplete="off">
        <Typography mt={"5%"} textAlign={"center"} fontSize={"150%"}>
          Login
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          autoFocus
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
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
