import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const {
    setPriceValue,
    setLocationValue,
    setPriceLow,
    setPriceHigh,
    setLocation,
  } = useContext(SearchContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile`, { withCredentials: true })
      .then((res) => {
        const userInfo = res.data;
        if (res.status === 400) {
          setUserInfo(null);
        } else {
          setUserInfo(userInfo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setUserInfo]);

  function logout() {
    axios
      .post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/");
  }

  const username = userInfo?.username;

  // The drop-down menu is displayed using the Material-UI Menu and MenuItem components.
  // When the user clicks on the Button component with the user's username, the
  // handleClick function is called, which sets the anchorEl state to the current
  // event target, which is the Button component. This causes the Menu component to
  // open, as it is set to anchor to the Button component using the anchorEl prop.

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetSearch = () => {
    setPriceLow(0);
    setPriceHigh(-1);
    setLocation("");
    setPriceValue("allPrices");
    setLocationValue("allPlaces");
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#E1F5FE",
          borderRadius: "10px",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/" className="logo" style={{ color: "black" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
              onClick={resetSearch}
            >
              Auto Exchange
            </Typography>
          </Link>
          {userInfo && (
            <>
              <Button
                color="inherit"
                startIcon={<MdArrowDropDown />}
                onClick={handleClick}
                sx={{ color: "black" }}
              >
                {username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/create"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Add Vehicle
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Link
                    to="/myVehicles"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    My Vehicles
                  </Link>
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
          {!userInfo && (
            <>
              <Link
                to="/login"
                style={{
                  marginLeft: "auto",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Button color="inherit">Login</Button>
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
