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
       <Link to="/home" className="links section-sign-up"><div className='sign-up'>sign-up</div><div>log-in</div></Link>
       <div className="links">my family-list</div>
       <div className="links">home</div>
       <div className="links familysMenu"><AiOutlineMenu /> family`s </div>
       </div>
    </div>
  );
}

