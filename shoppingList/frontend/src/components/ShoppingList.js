import React, { useEffect, useState } from 'react';
import "../style/ShoppingList.css";
import TempShoppingList from "./TempShoppingList";
import AddItem from "./AddItems";
import WhatsAppSend from './WhatsAppSend';

const API_BASE = 'http://localhost:5000';

//componnet of the shopping list hold the data of the selected Shopping list
export default function ShoppingList({ selectedShoppingId, listName, user, setUser }) {
  // State to hold all items from the backend
  const [items, setItems] = useState([])
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
      </div>
      <AddItem setItems={setItems}
        items={items}
        listId={listId} />

    </div>
  );
}