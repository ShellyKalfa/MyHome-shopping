import React, { useEffect, useState } from 'react';
import "../style/ShoppingList.css";
import TempShoppingList from "./TempShoppingList";
import AddItem from "./AddItems";
import WhatsAppSend from './WhatsAppSend';

const API_BASE = 'http://localhost:5000';

<<<<<<< HEAD
export default function ShoppingList({ selectedShoppingId }) {
  const [items, setItems] = useState([]);
=======
//componnet of the shopping list hold the data of the selected Shopping list
export default function ShoppingList({ selectedShoppingId, listName, user, setUser }) {
  // State to hold all items from the backend
  const [items, setItems] = useState([])
>>>>>>> whatsapp1
  const [listId, setListId] = useState(selectedShoppingId);


  useEffect(() => {
    setListId(selectedShoppingId);
  }, [selectedShoppingId]);

  useEffect(() => {
    if(!listId) return;
    fetch(`${API_BASE}/Shopping/item/${listId}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error loading items:", err));
  }, [listId]);

  return (
<<<<<<< HEAD
    <div className="shopping-page-container">
      <div className="shopping-grid-layout">
        
        {/* עמודה ימנית גדולה - הרשימה עצמה */}
        <div className="white-card">
            <div className="card-header-title">רשימת קניות</div>
            <TempShoppingList 
                items={items}
                setItems={setItems}
                isTemp={false} 
            />
        </div>

        {/* עמודה שמאלית צרה - טופס הוספה */}
        <div style={{ position: 'sticky', top: '20px' }}>
            <div className="white-card">
                <div className="card-header-title">הוספת מוצר</div>
                <AddItem 
                    setItems={setItems}
                    items={items}
                    listId={listId} 
                />
            </div>
        </div>

=======
    <div className="shoppingListBord">
      <div className="boardSizeShoppingList">
        <TempShoppingList items={items}
          setItems={setItems}
          isTemp={false}
          listName={listName}
          user={user}
        />
        <WhatsAppSend isTemp={false}
          items={items}
          user={user}
          setUser={setUser} />
>>>>>>> whatsapp1
      </div>
      <AddItem setItems={setItems}
        items={items}
        listId={listId} />

    </div>
  );
}