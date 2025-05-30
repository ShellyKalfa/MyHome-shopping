import React, { useState } from "react";
import axios from 'axios';

import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css';


const API_BASE = 'http://localhost:5000/Shopping';



export default function ItemShoppingList({ item, deleteItem,updateItem }) {
    const onDelete = () => {
        deleteItem(item.itemId)
    }
   const toggleCompleted = async () => {
        try {
            const response = await axios.patch(`${API_BASE}/item/${item.itemId}`, {
                completed: !item.completed
            });
            if (updateItem) updateItem(item.itemId, { completed: !item.completed });  // optional state update
        } catch (err) {
            console.error('Failed to update item status:', err);
        }
    };



    return (
        <div className="ItemShoppingList">
            <div  onClick={toggleCompleted}>
                {item.completed ? <MdCheckCircle /> : <ImRadioUnchecked />}
            </div>

            <div className="listItem">
                <div className="itemText" dir="auto">{item.itemName}</div>
                <div className="amountItem"> amount:{item.quantity}</div>
                <div className="priceItem"> price:{item.price}</div>
            </div>

            <div>
                <MdEdit />
                <div onClick={onDelete}>  <BsTrash />  </div>

            </div>
        </div >
    )
};

