import React, { useState, useEffect } from 'react';
import ItemShoppingList from "./ItemShoppingList";
import GroupedItems from './GroupedItems';
import '../style/TempShoppingList.css'
import Typing from './Typing';

const API_BASE = 'http://localhost:5000';

export default function TempShoppingList({ items,isTemp,setItems }) {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [uniqueItemsCount, setUniqueItemsCount] = useState(0);
// Trackinng live changes in completion status
  useEffect(() => {
    calculateSummary();
  }, [items]); 

  const calculateSummary = () => {
    const uncompletedItems = items.filter(item => item.completed === 0);
    
    const total = uncompletedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const totalQuantity = uncompletedItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    setTotalPrice(total);
    setTotalItems(totalQuantity);
    setUniqueItemsCount(uncompletedItems.length);
  };

 /**
   * Deletes an item from the backend and updates the local state.
   *
   * @param {number} itemId - The ID of the item to delete.
   */
  const deleteItem = (itemId) => {
    fetch(`${API_BASE}/Shopping/item/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.filter((item) => item.itemId !== itemId));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

const updateItem = (id, newData) => {
    setItems(prevItems =>
        prevItems.map(item =>
            item.itemId === id ? { ...item, ...newData } : item
        )
    );
};

  // Group items by department
  const groupedItems = items.reduce((groups, item) => {
    const dept = item.department || 'לא מסווג'; 
    if (!groups[dept]) {
      groups[dept] = [];
    }
    groups[dept].push(item);
    return groups;
  }, {});

    return (
    <div className='board'>
      <div className='flex'>
        <div className="header-row">
          <h2 className='shoppingListTitle'>
            {isTemp
                ? <Typing text={['רשימת קניות', 'כדורגל עם חברים', 'ערב תה עם הבנות', 'ערב זוגי בבית']} />
                : 'רשימת קניות'}
          </h2>


        </div>
        <div className='board-items scrollable'>
                    <GroupedItems
            groupedItems={groupedItems}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
        <div className="total-amount">
          לתשלום: {totalPrice.toFixed(2)}₪
        </div>
      </div>
    </div>
  );
}
