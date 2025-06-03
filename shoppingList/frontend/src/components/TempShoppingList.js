import React, { useState, useEffect } from 'react';
import axios from 'axios';


import ItemShoppingList from "./ItemShoppingList";
import '../style/TempShoppingList.css'
import Typing from './Typing';

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

        console.log("items",items);
        console.log("filter",items.filter((item) => item.itemId !== itemId));
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


    return (
        <div className='board'>
            <div className='flex'>
                <h2 className='textCenter'> {isTemp ? <Typing text={['רשימת קניות ','כדורגל עם חברים','ערב תה עם הבנות','ערב זוגי בבית']}/> :' רשימת קניות '}</h2>
                <div className='board-items '>
                    {items.map((item, index) => (
                        <ItemShoppingList 
                        key={index} 
                        item={item} 
                        deleteItem={deleteItem}
                        updateItem={updateItem} />
                    ))}
                </div>
            </div>
            {/*<button className='bigButton'> Send To Wolt </button>*/}
        </div>
    );
}
