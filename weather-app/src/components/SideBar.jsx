import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SideBar = (props) => {
  const [placesState, setPlaceState] = useState([
    {
      name: "Berlin",
      value: { lat: "52.50", lon: "13.40", data: null },
    },
    { name: "Munich", value: { lat: "48.13", lon: "11.58", data: null } },
    { name: "Rome", value: { lat: "44.34", lon: "10.39", data: null } },
    { name: "Heidelberg", value: { lat: "49.39", lon: "8.6", data: null } },
  ]);
  const fetchWeather = () => {
    let places = ["Berlin", "Munich", "Rome", "Heidelberg"];
    places.forEach(async (place) => {
      let selectedPLace = placesState.filter(
        (place1) => place1.name === place
      )[0];
      let res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          selectedPLace.value.lat +
          "&lon=" +
          selectedPLace.value.lon +
          "&appid=c59f912abff58c2edc56054eb02dc08b"
      );
      if (res.ok) {
        let data = await res.json();
        let currentState = placesState;
        placesState.forEach((value, index) => {
          if (value.name === place) {
            placesState[index] = {
              name: place,
              value: {
                lat: selectedPLace.value.lat,
                lon: selectedPLace.value.lon,
                data: data,
              },
            };
          }
        });
        setPlaceState(currentState);
      } else {
        console.error("something wrong");
      }
    });
  };
  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placesState]);
  return (
    <div className="colorSide">
      <ul>
        {placesState.map((place, index) => {
          return (
            <li
              key={index}
              style={{ listStyle: "none" }}
              className="ml-n5 mb-3"
              onClick={() => {
                props.selectPlace(place);
              }}
            >
              <h6>{place.name}</h6>
              <p>
                <small>
                  {" "}
                  {new Date().getHours()}:{new Date().getMinutes()}
                </small>
              </p>
              {place.value.data !== null ? (
                <p className="mt-n3">
                  <small>{place.value.data.weather[0].description}</small>
                </p>
              ) : (
                ""
              )}
              <hr className="horizontal" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
