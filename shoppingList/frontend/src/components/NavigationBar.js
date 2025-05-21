import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMenu } from "react-icons/ai";
import '../style/NavigationBar.css'
import logo from '../assets/logo.png';

export default function NavigationBar({ User, familysApp, logOut, setSelectedFamilyId }) {
  const [data, setData] = useState([]);
  const [nameUser, setNameUser] = useState('');
  const [isUser, setIsUser] = useState(false);

  const selectedFamilyId = (familyId) => {
    setSelectedFamilyId(familyId)
    console.log("familyId", familyId);


  }


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
          isUser ? <>
            <div className="links section-sign-up" > WELLCOME: {nameUser}</div>
            <div className="links section-sign-up" onClick={logOut} > logOUT</div>

          </>
            :
            <div className="links section-sign-up">
              <Link to="/Signup" className='sign-up Link'>Sign-Up</Link>
              <Link to="/Login" className='Link' > Log-In</Link>
            </div>
        }
        {/*<div className="links">my family-list</div>*/}
        <Link to="/CreateFamily" className="links Link">Management </Link>


        {console.log("sdads", familysApp)}
        <select>
          {
            familysApp.map((f, index) => (<option key={index} onClick={() => selectedFamilyId(f.familyId)} > {f.familyName}</option>))
          }
        </select>
        <div>
          <Link to="/ShoppingListFile" className="links Link familysMenu">
            <div>
              <AiOutlineMenu /> Family-list
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

