import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Join} />
        <Route path="/chat" exact Component={Chat} />
      </Routes>
    </Router>
  );
}

export default App;
