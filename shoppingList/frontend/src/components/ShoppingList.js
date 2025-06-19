import axios from 'axios'
import React, { useEffect, useState } from 'react';


import TempShoppingList from "./TempShoppingList";
import Requests from './Requests';
import AddItem from "./AddItems";
import Roles from '../api/roles';

import "../style/ShoppingList.css"

const API_BASE = 'http://localhost:5000';


export default function ShoppingList({ selectedShoppingId, selectedAdminShopping }) {
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
      {console.log("item", items)}
      <div>
        <AddItem setItems={setItems}
          items={items}
          listId={listId}
          selectedAdminShopping={selectedAdminShopping} />
        {selectedAdminShopping == Roles.MANAGER ?
          <Requests setItems={setItems}
            items={items} />
          : <></>}
      </div>
      <div className="boardSizeShoppingList">
        <TempShoppingList items={items}
          setItems={setItems}
          isTemp={false} />
      </div>
    </div>

  )
}
;