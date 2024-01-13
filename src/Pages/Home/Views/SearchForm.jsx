import React from "react";
import { Searched } from "../../../Utility/SearchHandler";

export default function SearchForm({
  toggle,
  city,
  setCity,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  setSearchDetails,
}) {
  return (
    <form>
      <div className="row pt-4">
        {toggle ? (
          <>
            <div className="col-sm-11">
              <input
                onChange={(event) => setCity(event.target.value)}
                className="form-control"
                type="search"
                placeholder="City"
                aria-label="Search"
              />
            </div>
            <div className="col-sm-1 text-end">
              <button
                onClick={(event) =>
                  Searched(
                    event,
                    toggle,
                    city,
                    latitude,
                    setLatitude,
                    longitude,
                    setLongitude,
                    setSearchDetails
                  )
                }
                className="btn my-btn"
                type="submit"
              >
                Search
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-sm-11">
              <div className="row">
                <div className="col">
                  <input
                    onChange={(event) => setLatitude(event.target.value)}
                    className="form-control"
                    type="number"
                    placeholder="Latitude"
                    aria-label="Search"
                  />
                </div>
                <div className="col">
                  <input
                    onChange={(event) => setLongitude(event.target.value)}
                    className="form-control"
                    type="number"
                    placeholder="Longitude"
                    aria-label="Search"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-1 text-end">
              <button
                onClick={(event) =>
                  Searched(
                    event,
                    toggle,
                    city,
                    latitude,
                    setLatitude,
                    longitude,
                    setLongitude,
                    setSearchDetails
                  )
                }
                className="btn my-btn"
                type="submit"
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
