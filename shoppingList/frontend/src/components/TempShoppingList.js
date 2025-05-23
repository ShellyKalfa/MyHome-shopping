import React, { useState, useEffect } from 'react';
import axios from 'axios';


import ItemShoppingList from "./ItemShoppingList";
import '../style/TempShoppingList.css'

const API_BASE = 'http://localhost:5000';

export default function TempShoppingList({ items,isTemp,setItems }) {


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
    return (
        <div className='board'>
            <div className='flex'>
                <h2>Shopping List </h2>
                <div className='board-items '>
                    {items.map((item, index) => (
                        <ItemShoppingList key={index} item={item} deleteItem={deleteItem} />
                    ))}
                </div>
            </div>
            {/*<button className='bigButton'> Send To Wolt </button>*/}
        </div>
    );
}
