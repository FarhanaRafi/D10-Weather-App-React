import React from "react";
import { Col, Row } from "react-bootstrap";
import Main from "./Main";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <Row>
      <Col xs={2} className="sideBar">
        <SideBar />
      </Col>
      <Col xs={10}>
        <Main />
      </Col>
    </Row>
  );
};

export default Home;
