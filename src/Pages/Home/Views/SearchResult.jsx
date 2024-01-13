import React from "react";
import Chart from "../../../Components/Chart";
import { FiveDayForecast } from "../../../Utility/APICalls";
import { KelvinToCelsius } from "../../../Utility/KelvinToCelsius";
import Card from "../../../Components/Card/Card";

export default function SearchResult({
  latitude,
  longitude,
  desiredData,
  setDesiredData,
  displayChart,
  setDisplayChart,
  searchDetails,
}) {
  return (
    <div className="row pb-5">
      <div className="col">
        <div className="center-it">
          <Card
            place={searchDetails.city}
            currTemp={KelvinToCelsius(searchDetails.currentTemperature)}
            maxTemp={KelvinToCelsius(searchDetails.maxTemperature)}
            minTemp={KelvinToCelsius(searchDetails.minTemperature)}
            humidity={searchDetails.humidity}
            weather={searchDetails.weatherConditions}
            icon={searchDetails.icon}
          />
        </div>
        <div className="center-it">
          {/* Requesting 5-Day Forecasting */}
          <button
            onClick={() =>
              FiveDayForecast(
                latitude,
                longitude,
                setDesiredData,
                setDisplayChart
              )
            }
            className="btn five-day-btn"
            type="button"
          >
            Show 5-Day Forecast
          </button>
        </div>
      </div>
      <div className="col center-it">
        {displayChart && <Chart data={desiredData} />}
      </div>
    </div>
  );
}
