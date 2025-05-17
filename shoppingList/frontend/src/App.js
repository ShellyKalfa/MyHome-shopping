import React, { useState,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import axios from 'axios';

import  NavigationBar from './components/NavigationBar';
import MainPage from "./MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./Home";
import CreateFamily from "./components/CreateFamily";
import ShoppingListFile from "./components/ShoppingListFile";

import './style/App.css'

const App = () => {
  const [user,setUser]=useState({});
  const [familysApp,setFamilysApp]=useState([])


       useEffect(() => {
          if (user && user.email && user.password && user.userId && user.userName) {
            axios.post(`http://localhost:5000/memberFamliy/${user.userId}`,{})
                    .then(res => {
                        console.log(res.data)
                    if(res.data.success){
                        console.log(res.data.familyName)
                        if(res.data.familyName!=null){
                            setFamilysApp(res.data.familyName)
                        }
                    }
                    })
                    .catch(err => { 
                        console.log(err)
                    })
          } 
      }, [user]);
  return (
    <div className="App">
      <NavigationBar  User={user} familysApp={familysApp} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<Login  setUser={setUser}/>} />
          <Route path="/Signup" element={<Signup setUser={setUser}/>} />
          <Route path="/CreateFamily" element={<CreateFamily  User={user}  />} />
          <Route path="/ShoppingListFile" element={<ShoppingListFile/>} />
        </Routes>
    </div>
  );
};

export default App;
