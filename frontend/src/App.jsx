import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import CardGrid from "./Card";
import AdminDashboard from "./admin";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CardGrid />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
