import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TextField, Button } from "@mui/material";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Search Input */}
      <div className="flex-1">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon 
                className="text-gray-300 mr-2" 
                sx={{ fontSize: 28, color: "rgb(209 213 219)" }} // Light gray icon
              />
            ),
            sx: {
              borderRadius: "12px",
              height: 56,
              fontSize: "1.1rem",
              backgroundColor: "transparent", // Transparent input
              border: "2px solid rgba(255, 255, 255, 0.7)", // Light border
              color: "white", // Text color
              "& input::placeholder": { color: "rgb(209 213 219)" }, // Light placeholder
              "&:hover fieldset": { borderColor: "#3b82f6!important" },
            },
          }}
        />
      </div>

      {/* Location Input */}
      <div className="flex-1">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="By Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputProps={{
            startAdornment: (
              <LocationOnIcon 
                className="text-gray-300 mr-2" 
                sx={{ fontSize: 28, color: "rgb(209 213 219)" }} // Light gray icon
              />
            ),
            sx: {
              borderRadius: "12px",
              height: 56,
              fontSize: "1.1rem",
              backgroundColor: "transparent", // Transparent input
              border: "2px solid rgba(255, 255, 255, 0.7)", // Light border
              color: "white", // Text color
              "& input::placeholder": { color: "rgb(209 213 219)" }, // Light placeholder
              "&:hover fieldset": { borderColor: "#3b82f6!important" },
            },
          }}
        />
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          height: 56,
          borderRadius: "12px",
          fontSize: "1.1rem",
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent button
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)", // Light border
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" }, // Slight hover effect
          px: 4,
          py: 1.5,
        }}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBox;