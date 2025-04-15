import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/MainPage.css'


function MainPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className='MainPage'>
      <div  className='titles'>
        <div className='countener'>
            <h1>Organize your family`s </h1>
            <h1>shopping List</h1>
        </div>
        <div className='countener'>
            <p>Create a shared grocery list and send it </p>
            <p>to wolt when you`re done </p>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default MainPage;
