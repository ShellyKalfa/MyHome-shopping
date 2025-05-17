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
  const [user,setUser]=useState({});
  return (
    <div className="App">
      <NavigationBar  User={user}/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<Login  setUser={setUser}/>} />
          <Route path="/Signup" element={<Signup setUser={setUser}/>} />
          <Route path="/CreateFamily" element={<CreateFamily  User={user}/>} />
          <Route path="/ShoppingListFile" element={<ShoppingListFile/>} />
        </Routes>
    </div>
  );
};

export default App;
