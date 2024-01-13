import { toast } from "react-toastify";
import { CallOnCity, CallOnCoordinates } from "./APICalls";
import { toastWarnObject } from "./Toast";

// Search Handler
export function Searched(event, toggle, city, latitude, setLatitude, longitude, setLongitude, setSearchDetails) {
    event.preventDefault() // preventing page to reload
    if (toggle) {
      if (city === '') {
        toast.warn("Please Enter the City Name!", toastWarnObject);
      }
      else CallOnCity(city, setLatitude, setLongitude, setSearchDetails)
    }
    else {
      if (latitude !== '' && longitude !== '') CallOnCoordinates(latitude, longitude, setSearchDetails)
      else {
        if (latitude === '') toast.warn("Please Enter Latitude Value!", toastWarnObject);
        if (longitude === '') toast.warn("Please Enter Longitude Value!", toastWarnObject);
      }
    }
  }