import React from "react";

const SearchMetadata = ({ query, location, processedAt }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Search Information</h2>
      <p className="text-sm text-gray-600">
        Showing results for "{query}" in {location}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Processed at: {new Date(processedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default SearchMetadata;