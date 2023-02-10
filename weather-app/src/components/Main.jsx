import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Main = () => {
  const [state, setState] = useState(null);
  const fetchWeather = async () => {
    let res = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c59f912abff58c2edc56054eb02dc08b"
    );
    console.log(res);
    if (res.ok) {
      let data = await res.json();
      setState(data);
      console.log(data);
    } else {
      console.error("something wrong");
    }
  };
  //   const convertToCelsius = (f) => {
  //     return (5 / 9) * (f - 32);
  //   };
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <>
      <div className="mainPage">
        {state !== null ? (
          <>
            <h3>{state.name}</h3>
            <h1>{state.main.temp}</h1>
            <p>{state.weather[0].description}</p>
            <p>
              H:{state.main.temp_max}, L:{state.main.temp_min}
            </p>
          </>
        ) : (
          "error"
        )}
      </div>
    </>
  );
};

export default Main;
