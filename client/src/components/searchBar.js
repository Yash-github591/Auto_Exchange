import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";

export default function VehicleSearchBar() {
  const {
    priceValue,
    setPriceValue,
    locationValue,
    setLocationValue,
    setPriceLow,
    setPriceHigh,
    setLocation,
  } = useContext(SearchContext);

  return (
    <Grid container style={{ padding: "1rem" }}>
      <Grid item xs={6}>
        <Box>
          <FormControl style={{ display: "flex" }}>
            <FormLabel id="demo-radio-label">Filter by Price ranges</FormLabel>
            <RadioGroup
              onChange={(e) => {
                setPriceValue(e.target.value);
              }}
              aria-labelledby="demo-radio-label"
              name="radio-group"
              value={priceValue}
            >
              <Grid container>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControlLabel
                    value="allPrices"
                    onClick={() => {
                      setPriceHigh(-1);
                      setPriceLow(0);
                    }}
                    control={<Radio />}
                    label="All Prices"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControlLabel
                    value="upto 2 lakhs"
                    onClick={() => {
                      setPriceHigh(200000);
                      setPriceLow(0);
                    }}
                    control={<Radio />}
                    label="Upto 2 lakhs"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControlLabel
                    value="2 - 5 lakhs"
                    onClick={() => {
                      setPriceHigh(500000);
                      setPriceLow(200000);
                    }}
                    control={<Radio />}
                    label="2 - 5 lakhs"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControlLabel
                    value="Above 5 lakhs"
                    onClick={() => {
                      setPriceHigh(-1);
                      setPriceLow(500000);
                    }}
                    control={<Radio />}
                    label="Above 5 lakhs"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <Box>
            <FormControl style={{ display: "flex" }}>
              <FormLabel id="demo-radio-label">Filter by locations</FormLabel>
              <RadioGroup
                value={locationValue}
                aria-labelledby="demo-radio-label"
                name="radio-group"
                onChange={(e) => {
                  setLocationValue(e.target.value);
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControlLabel
                      value="allPlaces"
                      onClick={() => {
                        setLocation("");
                      }}
                      control={<Radio />}
                      label="All Places"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControlLabel
                      value="Delhi"
                      onClick={() => {
                        setLocation("Delhi");
                      }}
                      control={<Radio />}
                      label="Delhi"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControlLabel
                      value="Bangalore"
                      onClick={() => {
                        setLocation("Bangalore");
                      }}
                      control={<Radio />}
                      label="Bangalore"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControlLabel
                      value="Hyderabad"
                      onClick={() => {
                        setLocation("Hyderabad");
                      }}
                      control={<Radio />}
                      label="Hyderabad"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </FormControl>
      </Grid>
    </Grid>
  );
}
