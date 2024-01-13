import axios from "axios";
import { accessKey } from "./AccessKey";
import { toast } from "react-toastify";
import { KelvinToCelsius } from "./KelvinToCelsius";

// Request based on city as input
export function CallOnCity(
  city,
  setLatitude,
  setLongitude,
  setSearchDetails
) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${accessKey}`
    )
    .then(async (res) => {
      const apiRes = await res.data;
      setSearchDetails({
        detailsRecieved: true,
        city: apiRes.name,
        currentTemperature: apiRes.main.temp,
        feelsLike: apiRes.main.feels_like,
        maxTemperature: apiRes.main.temp_max,
        minTemperature: apiRes.main.temp_min,
        humidity: apiRes.main.humidity,
        weatherConditions: apiRes.weather[0].main,
        icon: apiRes.weather[0].icon,
      });
      setLatitude(apiRes.coord.lat);
      setLongitude(apiRes.coord.lon);
    })
    .catch((err) => {
      toast.error("Invalid City Name!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    });
}

// Request based on coordinates as input
export function CallOnCoordinates(latitude, longitude, setSearchDetails) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${accessKey}`
    )
    .then(async (res) => {
      const apiRes = await res.data;
      setSearchDetails({
        detailsRecieved: true,
        city: apiRes.name,
        currentTemperature: apiRes.main.temp,
        feelsLike: apiRes.main.feels_like,
        maxTemperature: apiRes.main.temp_max,
        minTemperature: apiRes.main.temp_min,
        humidity: apiRes.main.humidity,
        weatherConditions: apiRes.weather[0].main,
        icon: apiRes.weather[0].icon,
      });
    })
    .catch((err) => {
      toast.error("Invalid Coordinates Values!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    });
}

// Forecasting Request
export function FiveDayForecast(
  latitude,
  longitude,
  setDesiredData,
  setDisplayChart
) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${accessKey}`
    )
    .then(async (res) => {
      const apiRes = await res.data;
      let tempArr = [];
      for (let i = 1; i <= 36; i += 7) {
        tempArr.push(apiRes.list[i].main.temp);
      }
      setDesiredData({
        day1Temp: KelvinToCelsius(tempArr[0]),
        day2Temp: KelvinToCelsius(tempArr[1]),
        day3Temp: KelvinToCelsius(tempArr[2]),
        day4Temp: KelvinToCelsius(tempArr[3]),
        day5Temp: KelvinToCelsius(tempArr[4]),
      });
    })
    .catch((err) => {
      console.log(err);
    });
  setDisplayChart(true);
}
