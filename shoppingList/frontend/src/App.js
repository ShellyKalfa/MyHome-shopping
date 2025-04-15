import React, { useState } from "react";
import  NavigationBar from './components/NavigationBar';
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Home from "./Home";

import './style/App.css'

const App = () => {
  return (
    <div className="App">
      <NavigationBar/>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/p" element={<Home/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
