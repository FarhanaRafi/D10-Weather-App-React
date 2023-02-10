import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// const places = [
//   { name: "Berlin", lat: "44.34", lon: "10.39", data: null },
//   { name: "Munich", lat: "44.34", lon: "10.39", data: null },
//   { name: "Rome", lat: "44.34", lon: "10.39", data: null },
//   { name: "Rome", lat: "44.34", lon: "10.39", data: null },
// ];
const SideBar = () => {
  const [placesState, setPlaceState] = useState([
    {
      name: "Berlin",
      value: { lat: "44.34", lon: "10.39", data: null },
    },
    { name: "Munich", value: { lat: "44.34", lon: "10.39", data: null } },
    { name: "Rome", value: { lat: "44.34", lon: "10.39", data: null } },
    { name: "Heidelberg", value: { lat: "44.34", lon: "10.39", data: null } },
  ]);
  const fetchWeather = async () => {
    let places = ["Berlin", "Munich", "Rome", "Heidelberg"];
    places.forEach(async (place) => {
      let selectedPLace = placesState.filter(
        (place1) => place1.name === place
      )[0];
      console.log(selectedPLace, "======");
      let res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          selectedPLace.value.lat +
          "&lon=" +
          selectedPLace.value.lon +
          "&appid=c59f912abff58c2edc56054eb02dc08b"
      );
      console.log(res);
      if (res.ok) {
        let data = await res.json();
        let currentState = placesState;
        currentState[place] = {
          lat: selectedPLace.value.lat,
          lon: selectedPLace.value.lon,
          data: data,
        };
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
        console.log(currentState);
        setPlaceState(currentState);
      } else {
        console.error("something wrong");
      }
    });
  };
  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="colorSide">
      {placesState.map((place) => {
        if (place.value != null) {
          return (
            <div className="sideDiv">
              <h6>{place.name}</h6>
              <p>
                <small>
                  {new Date().getHours()}:{new Date().getMinutes()}
                </small>
              </p>
              <p className="mt-n3">
                <small>{place.value.data.weather[0].description}</small>
              </p>
              <hr className="horizontal" />
            </div>
          );
        } else {
          return (
            <div>
              <h6>{place.name}</h6>
              <p>
                <small>
                  {new Date().getHours()}:{new Date().getMinutes()}
                </small>
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SideBar;
