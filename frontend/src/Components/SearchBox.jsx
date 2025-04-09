import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
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
                sx={{ fontSize: 28, color: "rgb(209 213 219)" }}
              />
            ),
            sx: {
              borderRadius: "12px",
              height: 56,
              fontSize: "1.1rem",
              backgroundColor: "transparent",
              border: "2px solid rgba(255, 255, 255, 0.7)",
              color: "white",
              "& input::placeholder": { color: "rgb(209 213 219)" },
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
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
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