import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import { accessKey } from '../Utility/AccessKey'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Card from '../Components/Card/Card'
import { KelvinToCelsius } from '../Utility/KelvinToCelsius'
import Chart from '../Components/Chart'

const Home = () => {
  // States
  const [city, setCity] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [toggle, setToggle] = useState(true)
  const [displayChart, setDisplayChart] = useState(false)
  let [desiredData, setDesiredData] = useState({
    day1Temp: '',
    day2Temp: '',
    day3Temp: '',
    day4Temp: '',
    day5Temp: '',
  })
  // This state includes particular fields asked in assignment
  let [searchDetails, setSearchDetails] = useState({
    detailsRecieved: false,
    city: '',
    currentTemperature: '',
    feelsLike: '',
    maxTemperature: '',
    minTemperature: '',
    humidity: '',
    weatherConditions: '',
    icon: ''
  })

  // Search Method Handler
  const ToggleHandler = () => {
    if (toggle) setToggle(false)
    else setToggle(true)
  }

  // Request based on city as input
  const CallOnCity = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${accessKey}`).then(async res => {
      const apiRes = await res.data
      setSearchDetails({
        detailsRecieved: true,
        city: apiRes.name,
        currentTemperature: apiRes.main.temp,
        feelsLike: apiRes.main.feels_like,
        maxTemperature: apiRes.main.temp_max,
        minTemperature: apiRes.main.temp_min,
        humidity: apiRes.main.humidity,
        weatherConditions: apiRes.weather[0].main,
        icon: apiRes.weather[0].icon
      })
      setLatitude(apiRes.coord.lat)
      setLongitude(apiRes.coord.lon)
    }).catch(err => {
      toast.error("Invalid City Name!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
      console.log(err)
    });
  }

  // Request based on coordinates as input
  const CallOnCoordinates = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${accessKey}`).then(async res => {
      const apiRes = await res.data
      setSearchDetails({
        detailsRecieved: true,
        city: apiRes.name,
        currentTemperature: apiRes.main.temp,
        feelsLike: apiRes.main.feels_like,
        maxTemperature: apiRes.main.temp_max,
        minTemperature: apiRes.main.temp_min,
        humidity: apiRes.main.humidity,
        weatherConditions: apiRes.weather[0].main,
        icon: apiRes.weather[0].icon
      })
    }).catch(err => {
      toast.error("Invalid Coordinates Values!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
      console.log(err)
    });
  }

  // Search Handler
  const Searched = (event) => {
    event.preventDefault() // preventing page to reload
    if (toggle) {
      if (city === '') {
        toast.warn("Please Enter the City Name!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
      else CallOnCity()
    }
    else {
      if (latitude !== '' && longitude !== '') CallOnCoordinates()
      else {
        if (latitude === '') toast.warn("Please Enter Latitude Value!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        if (longitude === '') toast.warn("Please Enter Longitude Value!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  // Forecasting Request
  const FiveDayForecast = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${accessKey}`).then(async res => {
      const apiRes = await res.data;
      let tempArr = []
      for (let i = 1; i <= 36; i += 7) {
        tempArr.push(apiRes.list[i].main.temp)
      }
      setDesiredData({
        day1Temp: KelvinToCelsius(tempArr[0]),
        day2Temp: KelvinToCelsius(tempArr[1]),
        day3Temp: KelvinToCelsius(tempArr[2]),
        day4Temp: KelvinToCelsius(tempArr[3]),
        day5Temp: KelvinToCelsius(tempArr[4]),
      })
    }).catch(err => {
      console.log(err)
    })
    setDisplayChart(true)
  }
  return (
    <>
      <Navbar />
      <div className={`bg-image ${displayChart ? '' : 'vh-100'}`}>
        <div className='container'>
          {/* Toggle Button */}
          <div className='pt-5 center-it'>
            <h5 className='switch-header'>Search Method</h5>
            <div className="button r" id="button-1">
              <input onChange={ToggleHandler} type="checkbox" className="checkbox" />
              <div className="knobs" />
              <div className="layer" />
            </div>
          </div>
          {/* Search Bar & Button */}
          <form>
            <div className='row pt-4'>
              {
                toggle
                  ?
                  <>
                    <div className='col-sm-11'>
                      <input onChange={(event) => setCity(event.target.value)} className="form-control" type="search" placeholder="City" aria-label="Search" />
                    </div>
                    <div className='col-sm-1 text-end'>
                      <button onClick={(event) => Searched(event)} className="btn my-btn" type="submit">Search</button>
                    </div>
                  </>
                  :
                  <>
                    <div className='col-sm-11'>
                      <div className='row'>
                        <div className='col'>
                          <input onChange={(event) => setLatitude(event.target.value)} className="form-control" type="number" placeholder="Latitude" aria-label="Search" />
                        </div>
                        <div className='col'>
                          <input onChange={(event) => setLongitude(event.target.value)} className="form-control" type="number" placeholder="Longitude" aria-label="Search" />
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-1 text-end'>
                      <button onClick={(event) => Searched(event)} className="btn my-btn" type="submit">Search</button>
                    </div>
                  </>
              }
            </div>
          </form>
          {
            // Displaying Card if Information is Recieved
            searchDetails.detailsRecieved
            &&
            <>
              <div className='row pb-5'>
                <div className='col'>
                  <div className='center-it'>
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
                  <div className='center-it'>
                    {/* Requesting 5-Day Forecasting */}
                    <button onClick={FiveDayForecast} className="btn five-day-btn" type="button">Show 5-Day Forecast</button>
                  </div>
                </div>
                <div className='col center-it'>
                  {displayChart && <Chart data={desiredData} />}
                </div>
              </div>
            </>
          }
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Home