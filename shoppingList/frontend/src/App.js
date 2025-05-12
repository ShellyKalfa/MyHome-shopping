import React, { useState } from "react";
import  NavigationBar from './components/NavigationBar';
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./Home";
import CreateFamily from "./components/CreateFamily";
import ShoppingListFile from "./components/ShoppingListFile";

import './style/App.css'

const App = () => {
  return (
    <div className="App">
      <NavigationBar/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/CreateFamily" element={<CreateFamily/>} />
          <Route path="/ShoppingListFile" element={<ShoppingListFile/>} />
        </Routes>
    </div>
  );
};

export default App;
