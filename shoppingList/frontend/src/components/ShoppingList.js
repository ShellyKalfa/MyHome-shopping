import axios from 'axios'
import React, { useEffect, useState } from 'react';

import "../style/ShoppingList.css"
import TempShoppingList from "./TempShoppingList";
import AddItem from "./AddItems";

const API_BASE = 'http://localhost:5000';

export default function ShoppingList({ selectedShoppingId }) {
  // State to hold all items from the backend
  const [item, setItem] = useState(["milk", "apple", "eggs", "apple"])
  const [items, setItems] = useState([])
  const [listId, setListId]=useState(selectedShoppingId);

useEffect(() => {
   setListId(selectedShoppingId)
   }, [selectedShoppingId])



   /**
   * useEffect hook to load item data from the backend.
   * Executes only once on component mount.
   */
  useEffect(() => {
      console.log("listId",listId);
     

    fetch(`${API_BASE}/Shopping/item/${listId}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error loading items:", err));
  }, [listId])

  return (
    <div className="shoppingListBord">
      {/* <h1>ShoppingList</h1> */}
{ console.log("item",items)}
      <AddItem  setItems={setItems} 
                items={items} 
                listId={listId}/>
      <div className="boardSizeShoppingList">
        <TempShoppingList items={items} isTemp={false} />
      </div>
    </div>

  )
}
;