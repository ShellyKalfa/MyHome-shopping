import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import FamilyMenu from './FamilyMenu';
import '../style/NavigationBar.css'
import logo from '../assets/logo.png';
import { IoIosLogOut } from "react-icons/io";

export default function NavigationBar({ User, familysApp, logOut, setSelectedFamilyId }) {
  const [data, setData] = useState([]);
  const [nameUser, setNameUser] = useState('');
  const [isUser, setIsUser] = useState(false);
  const location = useLocation();

  const selectedFamilyId = (familyId) => {
    setSelectedFamilyId(familyId);
    console.log("familyId", familyId);
  };


  useEffect(() => {
    if (User && User.email && User.password && User.userId && User.userName) {
      setNameUser(User.userName); // Assuming the userName is what you want to display
      setIsUser(true);
    } else {
      setNameUser('');
      setIsUser(false);
    }
  }, [User]);

  return (
    <div className="NavigationBar">
      <Link to="/"> <img src={logo} alt="My" /></Link>
      <div className="nav">

        {
          isUser ? <div className="welcomeFlex">
            <div className="links section-sign-up welcome" ><div> WELCOME:  </div> <div>{nameUser}</div></div>
            <div className="links section-sign-up welcome" onClick={logOut} ><IoIosLogOut />
              logOut</div>

          </div>
            :
            <div className="links section-sign-up">
              <Link to="/Signup" className='Link sign-up '>Sign-Up</Link>
              <Link to="/Login" className='Link ' > Log-In</Link>
            </div>
        }
        <Link to="/CreateFamily"
          className={`links Link ${location.pathname === "/CreateFamily" ? "active" : ""}`}>מרכז הפיקוד של המשפחה </Link>
       <Link to="/Task"
          className="links Link ">ניהול מטלות</Link>
        <FamilyMenu familysApp={familysApp} selectedFamilyId={selectedFamilyId} />


      </div>
    </div>
  );
}

