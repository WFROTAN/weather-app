import React from "react";
import "./Weather.css";

const Weather = props => {
  return (
    <body className={props.gif}>
      {props.children}
      <div className="weather-container">
        <span className="city">
          {props.city}, {props.country}
        </span>
        <span className="description">{props.description}</span>
        <i class={props.icon} />
        <span className="current-temp">{props.currentTemp}</span>
      </div>
    </body>
  );
};

export default Weather;
