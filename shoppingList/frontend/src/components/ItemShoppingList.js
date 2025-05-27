import React, { useState } from "react";
import axios from 'axios';

import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css';

const API_BASE = 'http://localhost:5000'; 



export default function ItemShoppingList({ item,items,setItems }) {
    const [completed,setCompleted]=useState(item.completed)
     /**
     * Deletes an item from the backend and updates the local state.
     *
     * @param {number} itemId - The ID of the item to delete.
     */
    const deleteItem = (itemId) => {
        fetch(`${API_BASE}/item/${itemId}`, {
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

     /**
     * Toggles the completed state of an item and updates the backend.
     *
     * @param {number} id - The ID of the item to toggle.
     */
    const handleCheckboxChange = async (id) => {
        const updatedItems = items.map(f =>
            f.itemId === id
                ? { ...f, completed: f.completed === 0 ? 1 : 0 }
                : f
        );

        setItems(updatedItems);

        const updatedItem = updatedItems.find(f => f.itemId === id);
        console.log(`Updated item: ${updatedItem.name}, completed: ${updatedItem.completed}`);

        try {
            await fetch(`http://localhost:5001/item/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: updatedItem.completed })
            })
                .then(res => res.json())
                .then(() => {
                    // Refresh item list from backend
                    fetch("http://localhost:5001/item")
                        .then(res => res.json())
                        .then(data => setItems(data))
                        .catch(err => console.error("Failed to reload items list:", err));
                });
        } catch (error) {
            console.error('Failed to update checkbox state:', error);
        }
    };
    return (
        <div className="ItemShoppingList">
              <div className="circle">
                 {  completed?  <MdCheckCircle /> :  <ImRadioUnchecked/> }
                </div>
            <div className="listItem">
              
              
                <div className="itemText">{item.itemName}</div>
                <div className="amountItem"> amount:{item.quantity}</div>
                <div className="priceItem"> price:{item.price}</div>
            </div>
            
            <div>
                <MdEdit />
                <BsTrash onClick={()=>deleteItem(item.itemId)} />
            </div>
        </div>
    );
}

