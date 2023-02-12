import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Main from "./Main";
import SideBar from "./SideBar";

const Home = () => {
  const [place, setPlace] = useState(null);

  const selectPlace = (place1) => {
    setPlace(place1);
  };

  return (
    <Row>
      <Col xs={2} className="sideBar">
        <SideBar selectPlace={selectPlace} />
      </Col>
      <Col xs={10}>
        <Main search={place} />
      </Col>
    </Row>
  );
};

export default Home;
