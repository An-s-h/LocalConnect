// LoadingIndicator.js
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="text-center my-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-2">Fetching results...</p>
    </div>
  );
};

export default LoadingIndicator;

