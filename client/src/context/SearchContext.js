import { createContext, useState } from "react";

export const SearchContext = createContext(null);

export function SearchContextProvider({ children }) {
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(200000000);
  const [location, setLocation] = useState("");
  const [priceValue, setPriceValue] = useState("allPrices");
  const [locationValue, setLocationValue] = useState("allPlaces");

  return (
    <SearchContext.Provider
      value={{
        priceLow,
        setPriceLow,
        priceHigh,
        setPriceHigh,
        location,
        setLocation,
        priceValue,
        setPriceValue,
        locationValue,
        setLocationValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
