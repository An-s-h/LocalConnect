// ErrorMessage.js
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="max-w-3xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;