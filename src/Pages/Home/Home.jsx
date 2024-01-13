import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { ToastContainer } from "react-toastify";
import SearchForm from "./Views/SearchForm";
import { ToggleHandler } from "../../Utility/ToggleHandler";
import SearchResult from "./Views/SearchResult";
import ToggleSwitch from "./Views/ToggleSwitch";

const Home = () => {
  // States
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [toggle, setToggle] = useState(true);
  const [displayChart, setDisplayChart] = useState(false);
  let [desiredData, setDesiredData] = useState({
    day1Temp: "",
    day2Temp: "",
    day3Temp: "",
    day4Temp: "",
    day5Temp: "",
  });
  // This state includes particular fields asked in assignment
  let [searchDetails, setSearchDetails] = useState({
    detailsRecieved: false,
    city: "",
    currentTemperature: "",
    feelsLike: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    weatherConditions: "",
    icon: "",
  });

  return (
    <>
      <Navbar />
      <div className={`bg-image ${displayChart ? "" : "vh-100"}`}>
        <div className="container">
          <ToggleSwitch
            toggleHandler={() => ToggleHandler(toggle, setToggle)}
          />

          <SearchForm
            toggle={toggle}
            city={city}
            setCity={setCity}
            latitude={latitude}
            setLatitude={setLatitude}
            longitude={longitude}
            setLongitude={setLongitude}
            setSearchDetails={setSearchDetails}
          />
          {
            // Displaying Card if Information is Recieved
            searchDetails.detailsRecieved && (
              <SearchResult
                latitude={latitude}
                longitude={longitude}
                desiredData={desiredData}
                setDesiredData={setDesiredData}
                displayChart={displayChart}
                setDisplayChart={setDisplayChart}
                searchDetails={searchDetails}
              />
            )
          }
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
