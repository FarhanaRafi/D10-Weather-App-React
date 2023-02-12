import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFoundPage from "./components/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let backGroundImg =
    new Date().getHours() > 19
      ? "https://ca-times.brightspotcdn.com/dims4/default/1e50589/2147483647/strip/true/crop/2048x1270+0+0/resize/1200x744!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd9%2Fd6%2F56fb41c649958652081d46e74042%2Fla-yir-photography-20171215-007.gif"
      : "https://images5.alphacoders.com/384/384242.jpg";

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backGroundImg})`,
          // objectFit: "fill",
          // width: "100%",
          // height: "150vh",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "contain",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
