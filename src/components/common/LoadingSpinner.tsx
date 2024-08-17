// src/components/LoadingSpinner.tsx
import React from "react";
import "../../styles/LoadingSpiner.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">잠시만 기다려주세요.</p>
    </div>
  );
};

export default LoadingSpinner;
