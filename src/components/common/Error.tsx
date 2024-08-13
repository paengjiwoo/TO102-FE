import React from "react";
import { ErrorComponentProps } from "@tanstack/react-router";

const Error: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderRadius: "5px",
        border: "1px solid #f5c6cb",
        margin: "20px 0",
      }}
    >
      <strong>Error: </strong> {error.message || "An unexpected error occurred"}
    </div>
  );
};

export default Error;
