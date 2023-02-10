import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Forecast from "./Forecast";

const Main = (props) => {
  const [place, setPlace] = useState(props.search);

  //   const fetchWeather = async () => {
  //     let res = await fetch(
  //       "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c59f912abff58c2edc56054eb02dc08b"
  //     );
  //     if (res.ok) {
  //       let data = await res.json();
  //       setState(data);
  //     } else {
  //       console.error("something wrong");
  //     }
  //   };
  //   const convertToCelsius = (f) => {
  //     return (5 / 9) * (f - 32);
  //   };
  useEffect(() => {
    console.log(props);
    setPlace(props.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.search]);
  return (
    <>
      {console.log(place, "place")}
      <div className="mainPage">
        {place != null && place.value.data != null ? (
          <>
            <h3 className="mt-5">{place.name}</h3>
            <h1 className="mt-n2">{place.value.data.main.temp}</h1>
            <p className="mt-n2">{place.value.data.weather[0].description}</p>
            <p className="mt-n3">
              H:{place.value.data.main.temp_max}, L:
              {place.value.data.main.temp_min}
            </p>
            <Forecast search={place} />
          </>
        ) : (
          "Select a place from the sidebar"
        )}
      </div>
    </>
  );
};

export default Main;
