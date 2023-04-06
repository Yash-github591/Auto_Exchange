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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box>
          <FormControl style={{ display: "flex" }}>
            <FormLabel id="demo-radio-label">Sort by Price ranges</FormLabel>
            <RadioGroup
              onChange={(e) => {
                setPriceValue(e.target.value);
              }}
              aria-labelledby="demo-radio-label"
              name="radio-group"
              value={priceValue}
            >
              <FormControlLabel
                value="allPrices"
                onClick={() => {
                  setPriceHigh(-1);
                  setPriceLow(0);
                }}
                control={<Radio />}
                label="All Prices"
              />
              <FormControlLabel
                value="0-5 lakhs"
                onClick={() => {
                  setPriceHigh(500000);
                  setPriceLow(0);
                }}
                control={<Radio />}
                label="0-5 lakhs"
              />
              <FormControlLabel
                value="5-10 lakhs"
                onClick={() => {
                  setPriceHigh(1000000);
                  setPriceLow(500000);
                }}
                control={<Radio />}
                label="5-10 lakhs"
              />
              <FormControlLabel
                value="above 10 lakhs"
                onClick={() => {
                  setPriceHigh(-1);
                  setPriceLow(1000000);
                }}
                control={<Radio />}
                label="above 10 lakhs"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <Box>
            <FormControl style={{ display: "flex" }}>
              <FormLabel id="demo-radio-label">Sort by locations</FormLabel>
              <RadioGroup
                value={locationValue}
                aria-labelledby="demo-radio-label"
                name="radio-group"
                onChange={(e) => {
                  setLocationValue(e.target.value);
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <FormControlLabel
                      value="allPlaces"
                      onClick={() => {
                        setLocation("");
                      }}
                      control={<Radio />}
                      label="All Places"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormControlLabel
                      value="Delhi"
                      onClick={() => {
                        setLocation("Delhi");
                      }}
                      control={<Radio />}
                      label="Delhi"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormControlLabel
                      value="Bangalore"
                      onClick={() => {
                        setLocation("Bangalore");
                      }}
                      control={<Radio />}
                      label="Bangalore"
                    />
                  </Grid>
                  <Grid item xs={5}>
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
