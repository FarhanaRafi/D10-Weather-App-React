import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";

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
  const [search, setSearch] = useState(null);
  const [placesList, setPlacesList] = useState([
    "Berlin",
    "Munich",
    "Rome",
    "Heidelberg",
  ]);

  const forceUpdate = React.useReducer((bool) => !bool)[1];

  const searchCity = async (query) => {
    let res = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=c59f912abff58c2edc56054eb02dc08b&q=" +
        query
    );
    if (res.ok) {
      let data = await res.json();
      console.log(data, "search result");
      let currentState = placesState;

      currentState.push({
        name: query,
        value: { lat: data[0].lat, lon: data[0].lon, data: null },
      });
      let currentPlaces = placesList;
      currentPlaces.push(query);

      setPlacesList(currentPlaces);
      setPlaceState(currentState);
      fetchWeather();
      forceUpdate();
    }
  };

  const fetchWeather = () => {
    let places = placesList;
    places.forEach(async (place) => {
      let selectedPLace = placesState.filter(
        (place1) => place1.name === place
      )[0];
      let res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          selectedPLace.value.lat +
          "&lon=" +
          selectedPLace.value.lon +
          "&appid=c59f912abff58c2edc56054eb02dc08b&units=metric"
      );
      if (res.ok) {
        let data = await res.json();
        let currentState = placesState;
        currentState.forEach((value, index) => {
          if (value.name === place) {
            currentState[index] = {
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
  }, [placesState, placesList]);
  return (
    <div className="colorSide">
      <Form
        className="mr-4 ml-n2"
        onSubmit={(e) => {
          e.preventDefault();
          searchCity(search);
        }}
      >
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
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
              {place.value.data !== null ? (
                <p className="mt-n1">
                  <strong>
                    {Math.floor(place.value.data.main.temp)}
                    {"\xB0"}
                  </strong>
                </p>
              ) : (
                ""
              )}
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
