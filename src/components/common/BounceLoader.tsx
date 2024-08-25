import React from "react";
import "../../styles/BounceLoader.scss";

const BounceLoader: React.FC = () => {
  return (
    <div className="bounce-loader-container">
      <div className="bounce-loader">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default BounceLoader;
