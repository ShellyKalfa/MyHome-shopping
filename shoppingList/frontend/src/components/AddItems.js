import React, { useState } from "react";
import axios from 'axios';

// API_BASE the server location
const API_BASE = 'http://localhost:5000/Shopping';

//the componet add items to the shopping list in the shopping 
function AddItem({ items, setItems, listId }) {
    const [itemNameAPI, setItemNameAPI] = useState("");
    const [itemPriceAPI, setItemPriceAPI] = useState("");
    const [itemTyping, setItemTyping] = useState("");
    const [quantityTyping, setQuantityTyping] = useState("1");
    const [suggestions, setSuggestions] = useState([]);
    const [itemDepartment, setItemDepartment] = useState("כללי");
    const [image, setImage] = useState("");

    const addItem = async () => {
        const trimmed = itemTyping.trim().toLowerCase();
        if (trimmed === "") return;

        // בדיקה אם קיים
        if (items.some(item => item.itemName.toLowerCase() === trimmed)) {
            alert("המוצר כבר קיים ברשימה!");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/item/${listId}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    itemName: itemNameAPI || itemTyping,
                    quantity: quantityTyping,
                    price: itemPriceAPI || 0,
                    department: itemDepartment,
                    image: image,
                    completed: 0
                }),
            });

            if (!res.ok) throw new Error("Failed to add");
            const data = await res.json();

            setItems([...items, {
                itemId: data.itemId,
                listId: listId,
                itemName: itemNameAPI || itemTyping,
                quantity: quantityTyping,
                price: itemPriceAPI || 0,
                department: itemDepartment,
                image: image,
                completed: 0
            }]);

            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    // חיפוש מוצרים
    const handleChange = (event) => {
        const text = event.target.value;
        setItemTyping(text);
        
        // אם המשתמש מקליד מחדש, נקה את הבחירה הקודמת
        if (image) { 
             resetSelection();
             setItemTyping(text); // מחזיר את הטקסט
        }

        if (text.length > 1) {
            axios.post(`${API_BASE}/search`, { aggs: 1, q: text, store: 331 })
                .then(res => {
                    if (res.data && res.data.data) {
                        const results = res.data.data.map(product => ({
                            "productName": product.name,
                            "productPrice": product.price.price,
                            "productCategory": product.department?.name || "כללי",
                            "productImage": product.images.small
                        }));
                        setSuggestions(results.slice(0, 5)); // מגביל ל-5 תוצאות שלא יסתיר את המסך
                    }
                })
                .catch(err => console.error(err));
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectProduct = (product) => {
        setItemNameAPI(product.productName);
        setItemPriceAPI(parseFloat(product.productPrice));
        setItemTyping(product.productName); // מעדכן את האינפוט לשם המלא
        setItemDepartment(product.productCategory);
        setImage(product.productImage);
        setSuggestions([]); // סוגר את הרשימה
    };

    const resetSelection = () => {
        setItemNameAPI("");
        setItemPriceAPI("");
        setImage("");
        setItemDepartment("כללי");
    };

    const resetForm = () => {
        resetSelection();
        setItemTyping("");
        setQuantityTyping("1");
        setSuggestions([]);
    };

    return (
        <div className="shopping-grid-add">
        <div className="add-item-wrapper">
            
            {/* 1. שדה חיפוש */}
            <div>
                <label className="input-label">שם המוצר</label>
                <input 
                    className="styled-input"
                    value={itemTyping}
                    onChange={handleChange}
                    placeholder="הקלד שם מוצר (למשל: חלב)..."
                    autoComplete="off"
                />
                
                {/* רשימת תוצאות - מופיעה רק כשיש הצעות ואין בחירה סופית */}
                {suggestions.length > 0 && !image && (
                    <ul className="autocomplete-results">
                        {suggestions.map((product, idx) => (
                            <li key={idx} className="result-item" onClick={() => handleSelectProduct(product)}>
                                <div className="result-info">
                                    <div className="result-name">{product.productName}</div>
                                    <div className="result-price">{product.productPrice?.toFixed(2)} ₪</div>
                                </div>
                                <img 
                                    src={`https://img.rami-levy.co.il${product.productImage}`} 
                                    alt="product" 
                                    className="result-image"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

          

            {/* 3. כמות */}
            <div>
                <label className="input-label">כמות</label>
                <input 
                    type="number" 
                    min="1"
                    className="styled-input"
                    value={quantityTyping}
                    onChange={(e) => setQuantityTyping(e.target.value)}
                />
            </div>

            {/* 4. כפתורים */}
            <div className="action-btn-group">
                <button className="btn-secondary" onClick={resetForm}>נקה</button>
                <button className="btn-primary" onClick={addItem}>הוסף לסל</button>
            </div>
        </div>
        <div>
              {/* 2. תצוגה מקדימה - מופיעה רק אחרי בחירה */}
            {image && (
                <div className="selected-product-preview">
                    <img 
                        src={`https://img.rami-levy.co.il${image}`} 
                        alt="Preview" 
                        style={{width:'100px', height:'100px', objectFit:'contain'}} 
                    />
                    <div className="preview-text">
                        <h4>{itemNameAPI}</h4>
                        <p>{itemPriceAPI} ₪ ליחידה</p>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default AddItem;