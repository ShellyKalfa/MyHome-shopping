import React, { useState } from "react";
import axios from 'axios';

import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css';

const API_BASE = 'http://localhost:5000';



export default function ItemShoppingList({ item, deleteItem }) {
    const onDelete = () => {
        deleteItem(item.itemId)
    }

    return (
        <div className="ItemShoppingList">
            <div >
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

