import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ShoppingListonHand.css';

export default function ShoppingListonHand({ user }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!user?.userId) return;

        axios.get(`http://localhost:5000/Shopping/completed-items/${user.userId}`)
            .then(res => {
                if (res.data.success) {
                    const formattedItems = res.data.items.map(item => ({
                        name: item.itemName,
                        amount: item.quantity,
                        price: item.price,
                        listName: item.listName
                    }));
                    setItems(formattedItems);
                }
            })
            .catch(err => {
                console.error("Error loading completed items:", err);
            });
    }, [user]);

    return (
        <div className="on-hand-container">
            <h1>Items On Hand</h1>
            <div className="item-grid">
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