import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ percent }) => {
  return (
    <div className="progress-bar-boundary">
      <div style={{ width: `${percent}%` }}>{percent}%</div>
    </div>
  );
};

export default ProgressBar;
