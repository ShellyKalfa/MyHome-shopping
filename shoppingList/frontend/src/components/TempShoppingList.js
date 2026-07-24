import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import axios from 'axios';

import WhatsAppSend from './WhatsAppSend';
import ItemShoppingList from "./ItemShoppingList";
>>>>>>> whatsapp1
import GroupedItems from './GroupedItems';
import Typing from './Typing';
import '../style/TempShoppingList.css'; // וודא שהשם תואם

const API_BASE = 'http://localhost:5000';

<<<<<<< HEAD
export default function TempShoppingList({ items, isTemp, setItems }) {
=======
export default function TempShoppingList({ items,isTemp,setItems,listName,user }) {
>>>>>>> whatsapp1
  const [totalPrice, setTotalPrice] = useState(0);

  // חישוב סכומים בכל פעם שהרשימה משתנה
  useEffect(() => {
    const calculateSummary = () => {
      const uncompletedItems = items.filter(item => !item.completed);

      const total = uncompletedItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      setTotalPrice(total);
    };

    calculateSummary();
  }, [items]);

  // מחיקת פריט
  const deleteItem = (itemId) => {
    fetch(`${API_BASE}/Shopping/item/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.filter((item) => item.itemId !== itemId));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // עדכון פריט
  const updateItem = (id, newData) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.itemId === id ? { ...item, ...newData } : item
      )
    );
  };

<<<<<<< HEAD
  // קיבוץ לפי מחלקות
  const groupedItems = items.reduce((groups, item) => {
    const dept = item.department || 'השלמות'; 
    if (!groups[dept]) groups[dept] = [];
=======
  // Group items by department
  const groupedItems = items.reduce((groups, item , user) => {
    const dept = item.department || 'לא מסווג'; 
    if (!groups[dept]) {
      groups[dept] = [];
    }
>>>>>>> whatsapp1
    groups[dept].push(item);
    return groups;
  }, {});

  return (
    <div className='board-container'>
      <div className='board-header'>
        <h2 className='shoppingListTitle'>
          {isTemp
<<<<<<< HEAD
            ? <Typing text={['רשימת קניות', 'ערב פיצה 🍕', 'על האש בשבת 🥩', 'קניות לבית 🏠']} />
            : 'רשימת קניות'}
=======
            ? <Typing text={['רשימת קניות', 'כדורגל עם חברים', 'ערב תה עם הבנות', 'ערב זוגי בבית']} />
            : listName="" ? ' רשימת קניות ':listName}
>>>>>>> whatsapp1
        </h2>
      </div>

<<<<<<< HEAD
      <div className='board-content scrollable-area'>
        <GroupedItems
            groupedItems={groupedItems}
            deleteItem={deleteItem}
            updateItem={updateItem}
        />
      </div>

      <div className="board-footer">
        <div className="total-label">סה״כ לתשלום:</div>
        <div className="total-value">{totalPrice.toFixed(2)} ₪</div>
=======

        </div>
        <div className='board-items scrollable'>
                    <GroupedItems
            groupedItems={groupedItems}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
        <div className="total-amount">
        {totalPrice.toFixed(2)}₪  לתשלום 
        </div>
>>>>>>> whatsapp1
      </div>
           
   
  );
}