import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Forecast from "./Forecast";

const Main = (props) => {
  const [place, setPlace] = useState(props.search);

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
            <h1 className="mt-n2">
              {Math.floor(place.value.data.main.temp)}
              {"\xB0"}
            </h1>
            <p className="mt-n2">{place.value.data.weather[0].description}</p>
            <p className="mt-n3">
              H:{Math.floor(place.value.data.main.temp_max)}
              {"\xB0"}, L:
              {Math.floor(place.value.data.main.temp_min)}
              {"\xB0"}
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
