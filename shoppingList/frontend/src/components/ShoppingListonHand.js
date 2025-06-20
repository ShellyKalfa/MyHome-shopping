import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ShoppingListonHand.css';
import Typing from "./Typing";
import ItemShoppingList from "./ItemShoppingList";

export default function ShoppingListonHand({ user, selectedFamilyId }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!selectedFamilyId) return;

        console.log("▶️ Fetching completed items for familyId:", selectedFamilyId);
        axios
            .get(`http://localhost:5000/Family/completed-items/${selectedFamilyId}`)
            .then(res => {
                console.log("✅ Backend response:", res.data);
                if (res.data.success) {
                    const formatted = res.data.items.map(i => ({
                        id: i.itemId,
                        name: i.itemName,
                        amount: i.quantity,
                        listName: i.listName,
                        image: i.image
                    }));
                    console.log("👉 Formatted items:", formatted);
                    setItems(formatted);
                }
            })
            .catch(err => console.error("❌ Error loading completed items:", err));
    }, [selectedFamilyId]);
    console.log("🗂️ Current items state:", items);

    const handleReturnToList = (itemId) => {
        console.log("Sending PATCH for itemId:", itemId);
        axios
            .patch(`http://localhost:5000/Shopping/item/${itemId}`, { completed: 0 })
            .then(res => {
                if (res.data.message) {
                    // Remove the item from the view
                    setItems(prev => prev.filter(item => item.id !== itemId));
                    console.log("reverse the complete item status:", res.data);

                }
            })
            .catch(err => {
                console.error("Error returning item:", err);
            });
    };

    return (
        <div className="on-hand-container">
            <h1>Items On Hand</h1>
            <h1 className="grid-title">רשימת קניות</h1>

            {items.length === 0 && (
                <p style={{ color: 'red', textAlign: 'center' }}>
                    ⚠️ No items found
                </p>
            )}

            <div className="cards-container">
                {items.map((item, idx) => (
                    <div className="item-card" key={idx}>
                        <div className="item-details">
                            {item.image && (
                                <img
                                    className="on-hand-image"
                                    src={`https://img.rami-levy.co.il${item.image}`}
                                    alt="item"
                                />
                            )}
                            <div className="item-name">{item.name}</div>
                            <div className="item-sub">amount: {item.amount}</div>
                            <div className="item-sub">from: {item.listName}</div>
                        </div>
                        <button
                            className="reverse-item-completed"
                            onClick={() => handleReturnToList(item.id)}
                        >
                            ↩️ החזר לרשימה
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
