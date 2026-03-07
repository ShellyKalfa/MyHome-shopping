import React, { useEffect, useState } from 'react';
import "../style/ShoppingList.css";
import TempShoppingList from "./TempShoppingList";
import AddItem from "./AddItems";

const API_BASE = 'http://localhost:5000';

export default function ShoppingList({ selectedShoppingId }) {
  const [items, setItems] = useState([]);
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

      </div>
    </div>
  );
}