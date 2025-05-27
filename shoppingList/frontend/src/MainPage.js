import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import TempShoppingList from './components/TempShoppingList';


import './style/MainPage.css'
import { GiMilkCarton,  GiShoppingCart} from "react-icons/gi";


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
      <h1>אמא כותבת פתקים</h1>
       <h1>  , אבא שוכח</h1>
      <h1>  <GiMilkCarton /> והחלב שוב לא בבית </h1>
     
    </div>
    <div className='countener'>
      <p>תעשו לעצמכם טובה – רשימת קניות אחת לכולם,</p>
      <p> <GiShoppingCart /> וכל מה שנשאר זה לשלוח לוולט. קל.</p>
    </div>
    <Link to="/Login" className='space top bigButton'>
      {'יאללה, מתחילים >>'}
    </Link>
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
