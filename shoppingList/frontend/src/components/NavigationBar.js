import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/NavigationBar.css'
import logo from '../assets/logo.png';
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

export default function NavigationBar({ User, familysApp, logOut, setSelectedFamilyId }) {
  const [data, setData] = useState([]);
  const [nameUser, setNameUser] = useState('');
  const [isUser, setIsUser] = useState(false);

  const selectedFamilyId = (event) => {
    const familyId = event.target.value;
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

        {/*<div className="links">my family-list</div>*/}
        <Link to="/CreateFamily" className="links Link">Management </Link>


        {console.log("sdads", familysApp)}
        <select onChange={selectedFamilyId}>
          {familysApp.map((f, index) => (
            <option key={index} value={f.familyId}>
              {f.familyName}
            </option>
          ))}
        </select>
        <div>
          {/*<Link to="/ShoppingListFile" className="links Link familysMenu">*/}
            <div className="links Link familysMenu">
              <AiOutlineMenu /> Family-list
            </div>
          {/*</Link>*/}
        </div>
        {
          isUser ? <div className="welcomeFlex">
              <div className="links section-sign-up welcome" ><div> WELCOME:  </div> <div>{nameUser}</div></div>
              <div className="links section-sign-up welcome" onClick={logOut} ><IoIosLogOut />
                logOut</div>

            </div>
            :
            <div className="links section-sign-up">
              <Link to="/Signup" className='Link'>Sign-Up</Link>
              <Link to="/Login" className='Link sign-up ' > Log-In</Link>
            </div>
        }
      </div>
    </div>
  );
}

