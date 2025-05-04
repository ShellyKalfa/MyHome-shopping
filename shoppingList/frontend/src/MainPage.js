import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TempShoppingList from './components/TempShoppingList';


import './style/MainPage.css'


function MainPage() {

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
        <button className='space top bigButton'> {'Get started >>'}</button>
      </div>
              <TempShoppingList/> 
    </div>
  );
}

export default MainPage;
