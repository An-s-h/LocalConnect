import React from "react";
import ResultCard from "./ResultCard";

const SearchResults = ({ results }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {results.map((place) => (
        <ResultCard key={place.place_id} place={place} />
      ))}
    </div>
  );
};

export default SearchResults;