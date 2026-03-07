import React, { useState, useEffect } from 'react';
import GroupedItems from './GroupedItems';
import Typing from './Typing';
import '../style/TempShoppingList.css'; // וודא שהשם תואם

const API_BASE = 'http://localhost:5000';

export default function TempShoppingList({ items, isTemp, setItems }) {
  const [totalPrice, setTotalPrice] = useState(0);

  // חישוב סכומים בכל פעם שהרשימה משתנה
  useEffect(() => {
    const calculateSummary = () => {
      // מסננים רק פריטים שלא הושלמו (או כולם, תלוי בלוגיקה שלך)
      // כאן הנחתי שרוצים לסכום את מה שצריך לקנות (completed === 0 או false)
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

  // קיבוץ לפי מחלקות
  const groupedItems = items.reduce((groups, item) => {
    const dept = item.department || 'לא מסווג'; 
    if (!groups[dept]) groups[dept] = [];
    groups[dept].push(item);
    return groups;
  }, {});

  return (
    <div className='board-container'>
      <div className='board-header'>
        <h2 className='shoppingListTitle'>
          {isTemp
            ? <Typing text={['רשימת קניות', 'ערב פיצה 🍕', 'על האש בשבת 🥩', 'קניות לבית 🏠']} />
            : 'רשימת קניות'}
        </h2>
      </div>

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
      </div>
    </div>
  );
}