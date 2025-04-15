import React, { useEffect, useState } from 'react';
import axios from 'axios';

function registrion() {
  const [userNameReg, setNameRegUser] = useState("");
  const [userPassword, setUserPassword] = useState("");

const register=()=>{
  axios.post('http://localhost:5000/register',{
   userName:userNameReg,
   password: userPassword}).then((response)=>{
     console.log(response)
   })
}

  return (
    <div className="App">
      <div>
        <h1>registrion</h1>
        <div>
          <label>user name</label>
          <input type='text' onChange={(e)=>{
            setNameRegUser(e.target.value);
            console.log(e.target.value);
          }}></input>
        </div>
        <div>
          <label>Password</label>
          <input type='text' onChange={(e)=>{
            setUserPassword(e.target.value);
          }}></input>
        </div>
        <button onClick={register}>register</button>
      </div>
    </div>
  );
}

export default registrion;
