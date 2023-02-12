import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { BsFillSunFill, BsFillCloudDrizzleFill } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { format } from "date-fns";

const Forecast = (props) => {
  const [place, setPlace] = useState(props.search);
  const [temps, setTemps] = useState([]);
  const fetchWeather = async () => {
    let res = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        props.search.value.lat +
        "&lon=" +
        props.search.value.lon +
        "&appid=c59f912abff58c2edc56054eb02dc08b&units=metric"
    );
    //data.weather[0].description
    if (res.ok) {
      let data = await res.json();
      setTemps(data.list.slice(0, 10));
    } else {
      console.error("something wrong");
    }
  };

  useEffect(() => {
    fetchWeather();
    setPlace(props.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.search]);
  return (
    <div className="forecast">
      <Row>
        <Col xs={10} md={10} lg={6}>
          <Table
            hover
            className="text-white ml-4 mr-5"
            style={{
              backgroundColor: "rgb(37, 150, 190,0.6)",
              borderRadius: "12px",
            }}
          >
            <tbody>
              {temps.map((temp) => {
                return (
                  <tr>
                    {/* <td>{temp.dt_txt.substring(11, 16)}</td> */}
                    <td>
                      {format(new Date(temp.dt), "eeee").substring(0, 3)}{" "}
                      {temp.dt_txt.substring(11, 16)}
                    </td>
                    <td className="text-white">
                      {temp.weather[0].main !== "Clouds" ? (
                        <BsFillSunFill />
                      ) : (
                        <BsFillCloudDrizzleFill />
                      )}
                    </td>
                    <td>
                      L:{Math.floor(temp.main.temp_min)} {"\xB0"} H:
                      {Math.floor(temp.main.temp_max)} {"\xB0"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Row>
          <Col xs={2}>
            <div
              className="text-white ml-4 box"
              style={{ backgroundColor: "rgb(37, 150, 190,0.6)" }}
            >
              <p className="pt-3 para">
                <WiHumidity />
                Humidity
              </p>
              <h2> {place.value.data.main.humidity}%</h2>
            </div>
          </Col>

          <Col xs={2}>
            <div
              className="text-white box1"
              style={{ backgroundColor: "rgb(37, 150, 190,0.6)" }}
            >
              <p className="pt-3 para">
                <CiTempHigh />
                Feels Like
              </p>
              <h2>
                {" "}
                {Math.floor(place.value.data.main.feels_like)} {"\xB0"}
              </h2>
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Forecast;
