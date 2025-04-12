import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";

const SearchBox = ({ searchQuery, setSearchQuery, handleNewSearch }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-md mb-8">
      <form onSubmit={handleNewSearch} className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon 
                  className="text-gray-400 mr-2" 
                  sx={{ fontSize: 28 }}
                />
              ),
              sx: {
                borderRadius: "12px",
                height: 56,
                fontSize: "1.1rem",
              },
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            height: 56,
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: 600,
            textTransform: "none",
            px: 4,
            py: 1.5,
          }}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;