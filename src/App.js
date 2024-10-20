import "./App.css";
import HomePage from "./page/homepage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./page/shop/Shop";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
