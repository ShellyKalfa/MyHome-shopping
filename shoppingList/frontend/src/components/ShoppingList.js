import axios from 'axios'
import React, { useEffect, useState } from 'react';

import "../style/ShoppingList.css"
import TempShoppingList from "./TempShoppingList";
import AddItem from "./AddItems";
import WhatsAppSend from './WhatsAppSend';

const API_BASE = 'http://localhost:5000';

export default function ShoppingList({ selectedShoppingId, listName, user,setUser }) {
  // State to hold all items from the backend
  const [items, setItems] = useState([])
  const [listId, setListId] = useState(selectedShoppingId);


  useEffect(() => {
    setListId(selectedShoppingId)
  }, [selectedShoppingId])



  /**
  * useEffect hook to load item data from the backend.
  * Executes only once on component mount.
  */
  useEffect(() => {
    console.log("listId", listId);


    fetch(`${API_BASE}/Shopping/item/${listId}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error loading items:", err));
  }, [listId])



  return (
    <div className="shoppingListBord">
      <AddItem setItems={setItems}
        items={items}
        listId={listId} />
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
          setUser={setUser}/>
      </div>

    </div>

  )
}
;