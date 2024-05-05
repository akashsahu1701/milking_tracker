import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MilkingPage from "./pages/MilkingPage";
import MilkingHistoryPage from "./pages/MilkingHistoryPage";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MilkingPage />} />
        <Route exact path="/history" element={<MilkingHistoryPage />} />
        <Route
          path="*"
          element={<div style={{ textAlign: "center" }}>404 NOT FOUND</div>}
        />
      </Routes>
    </Router>
  );
};

export default Routing;
