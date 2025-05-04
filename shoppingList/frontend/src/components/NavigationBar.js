import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMenu } from "react-icons/ai";
import '../style/NavigationBar.css'
import logo from'../assets/logo.png';

export default function NavigationBar() {
  const [data, setData] = useState([]);

  return (
    <div className="NavigationBar">
       <img src={logo} alt="My" />
       <div className="nav">
       <div  className="links section-sign-up">
            <Link to="/Signup" className='sign-up Link'>sign-up</Link>
            <Link to="/Login" className='Link' > log-in</Link>
       </div>
       <div className="links">my family-list</div>
       <Link to="/" className="links Link">home</Link>
       <div className="links familysMenu"><AiOutlineMenu /> family`s </div>
       </div>
    </div>
  );
}

