import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TempShoppingList from './components/TempShoppingList';


import './style/MainPage.css'
import { Link } from 'react-router-dom';


function MainPage() {
  const [items, setItems] = useState([
    {
      itemId: 1,
      itemName: "חלב",
      listId: 3,
      price: 7.1,
      quantity: 1
    },{
      itemId: 2,
      itemName: "גבינה",
      listId: 3,
      price: 7.1,
      quantity: 1
    }, {
      itemId: 1,
      itemName: "לחם",
      listId: 3,
      price: 7.1,
      quantity: 1
    }])

  return (
    <div className='MainPage'>
      <div className='titles'>
        <div className='countener'>
          <h1>Organize your family`s </h1>
          <h1>shopping List</h1>
        </div>
        <div className='countener'>
          <p>Create a shared grocery list and send it </p>
          <p>to wolt when you`re done </p>
        </div>
        <Link to="/Login" className='space top bigButton'> {'Get started >>'}</Link>
      </div>
      <div className='boardSide'>
        <div className="boardSize">
          <TempShoppingList items={items} isTemp={true} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
