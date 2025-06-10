import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ShoppingListonHand.css';
import Typing from "./Typing";
import ItemShoppingList from "./ItemShoppingList";

export default function ShoppingListonHand({ user, selectedFamilyId }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!selectedFamilyId) return;

        axios
            .get(`http://localhost:5000/Shopping/completed-items/${selectedFamilyId}`)
            .then(res => {
                if (res.data.success) {
                    const formattedItems = res.data.items.map(item => ({
                        name: item.itemName,
                        amount: item.quantity,
                        price: item.price,
                        listId: item.listId,
                        listName: item.listName
                    }));
                    setItems(formattedItems);
                }
            })
            .catch(err => {
                console.error("Error loading completed items:", err);
            });
    }, [selectedFamilyId]);

    return (
        <div className="on-hand-container">
            <h1>Items On Hand</h1>
            <div className="item-grid">
                <h1 className="grid-title" >רשימת קניות</h1>
                {items.length === 0 && (
                    <p style={{ color: 'red', gridColumn: '1 / -1', textAlign: 'center' }}
                        >⚠️ No items found
                    </p>)}
                {items.map((item, index) => (
                    <div className="item-card" key={index}>
                        <span className="check">✔️</span>
                        <div className="item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="item-sub">amount: {item.amount}</div>
                            <div className="item-sub">price: {item.price}</div>
                            <div className="item-sub">from: {item.listName}</div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}