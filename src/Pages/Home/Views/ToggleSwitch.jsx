import React from "react";

export default function ToggleSwitch({ toggleHandler }) {
  return (
    <div className="pt-5 center-it">
      <h5 className="switch-header">Search Method</h5>
      <div className="button r" id="button-1">
        <input onChange={toggleHandler} type="checkbox" className="checkbox" />
        <div className="knobs" />
        <div className="layer" />
      </div>
    </div>
  );
}
