import React, { useState } from "react";
import axios from 'axios';
import { FiCheck, FiCircle, FiCheckCircle, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import '../style/ItemShoppingList.css';

const API_BASE = 'http://localhost:5000/Shopping';

export default function ItemShoppingList({ item, deleteItem, updateItem }) {
    // State definitions
    const [newItem, setNewItem] = useState(item.itemName);
    const [itemPriceAPI, setItemPriceAPI] = useState(item.price);
    const [itemDepartment, setItemDepartment] = useState(item.department);
    const [itemImage, setItemImage] = useState(item.image || "");
    const [isEdit, setIsEdit] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    
    // סטייט חדש לטיפול בתמונות שבורות
    const [imageError, setImageError] = useState(false);

    const [isAmountEdit, setIsAmountEdit] = useState(false);
    const [newAmount, setNewAmount] = useState(item.quantity);

    // --- Handlers ---
    const onEdit = () => { setIsEdit(true); setNewItem(item.itemName); setSuggestions([]); };
    const onSave = () => { renameItem(); }; 
    const onCancelEdit = () => { setIsEdit(false); setIsAmountEdit(false); };

    const onDelete = () => { deleteItem(item.itemId); };

    const toggleCompleted = async () => {
        try {
            const newCompletedStatus = item.completed === 0 ? 1 : 0;
            if (updateItem) updateItem(item.itemId, { ...item, completed: newCompletedStatus });
            await axios.patch(`${API_BASE}/item/${item.itemId}`, { completed: newCompletedStatus });
        } catch (err) {
            console.error('Failed to update item status:', err);
        }
    };

    const handleAutoComplete = (event) => {
        const text = event.target.value;
        setNewItem(text);
        if (text.length > 1) {
            axios.post(`${API_BASE}/search`, { aggs: 1, q: text, store: 331 })
                .then(res => {
                    if (res.data?.data) {
                        const results = res.data.data.map(p => ({
                            productName: p.name,
                            productPrice: p.price.price,
                            productCategory: p.department?.name || "כללי",
                            productImage: p.images.small || ""
                        }));
                        setSuggestions(results.slice(0, 10));
                    }
                })
                .catch(err => console.error("Autocomplete error", err));
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (product) => {
        setItemPriceAPI(parseFloat(product.productPrice));
        setNewItem(product.productName);
        setItemDepartment(product.productCategory);
        setItemImage(product.productImage);
        setImageError(false); // איפוס שגיאת תמונה אם נבחר מוצר חדש
        setSuggestions([]);
    };

    const renameItem = async () => {
        const newName = newItem?.trim();
        if (!newName) return onCancelEdit();

        try {
            await fetch(`${API_BASE}/item/${item.itemId}/name`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    price: itemPriceAPI,
                    department: itemDepartment,
                    image: itemImage,
                    listId: item.listId
                })
            });
            updateItem(item.itemId, { 
                itemName: newName, price: itemPriceAPI, department: itemDepartment, image: itemImage 
            });
            setIsEdit(false);
        } catch (err) { alert("Error: " + err.message); }
    };

    const changeAmount = async (e) => {
        const quantity = parseInt(e.target.value);
        if (isNaN(quantity) || quantity <= 0) return;
        setNewAmount(quantity); 

        try {
            await fetch(`${API_BASE}/item/${item.itemId}/quantity`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity }),
            });
            updateItem(item.itemId, { quantity });
        } catch (err) { console.error(err); }
    };

    // --- לוגיקה חדשה לתמונות ---
    const getFinalImageUrl = () => {
        const img = itemImage || item.image;
        if (!img) return null; // אם אין תמונה, מחזיר null
        return img.startsWith('http') ? img : `https://img.rami-levy.co.il${img}`;
    };

    const imageUrl = getFinalImageUrl();
    const shouldShowImage = imageUrl && !imageError; // מציג רק אם יש URL ואין שגיאת טעינה

    return (
        <div className={`shopping-item-row ${item.completed ? 'completed' : ''} ${isEdit ? 'editing' : ''}`}>
            
            {/* חלק 1: צ'קבוקס ותמונה */}
            <div className="item-start">
                <div className="checkbox-wrapper" onClick={toggleCompleted}>
                    {item.completed 
                        ? <FiCheckCircle className="icon-checked" /> 
                        : <FiCircle className="icon-unchecked" />}
                </div>
                
                {/* התמונה מוצגת רק אם התנאי מתקיים */}
                {shouldShowImage && (
                    <div className="image-wrapper">
                        <img 
                            src={imageUrl} 
                            alt="product" 
                            onError={() => setImageError(true)} // מסתיר את התמונה אם הלינק שבור
                        />
                    </div>
                )}
            </div>

            {/* חלק 2: מידע מרכזי */}
            <div className="item-center">
                <div className="item-primary-row">
                    {isEdit ? (
                        <div className="edit-name-wrapper">
                            <input 
                                className="edit-input name-input"
                                value={newItem}
                                onChange={handleAutoComplete}
                                placeholder="שם מוצר..."
                                autoFocus
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions-dropdown">
                                    {suggestions.map((s, i) => (
                                        <li key={i} onClick={() => handleSuggestionClick(s)}>
                                            {/* הצגת תמונה בהצעות רק אם יש */}
                                            {s.productImage && (
                                                 <img src={`https://img.rami-levy.co.il${s.productImage}`} alt="" />
                                            )}
                                            <span>{s.productName}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <span className="product-name" onClick={toggleCompleted}>{item.itemName}</span>
                    )}
                </div>

                <div className="item-meta-row">
                    <div className="quantity-badge">
                        <input 
                            type="number" 
                            className="qty-input"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            onBlur={changeAmount} 
                            onKeyDown={(e) => e.key === 'Enter' && changeAmount(e)}
                        />
                        <span className="qty-label">יח׳</span>
                    </div>
                    <span className="separator">•</span>
                    <span className="department-tag">{itemDepartment || "כללי"}</span>
                </div>
            </div>

            {/* חלק 3: מחיר ופעולות */}
            <div className="item-end">
                <div className="price-tag">
                    {(itemPriceAPI * newAmount).toFixed(2)} ₪
                </div>

                <div className="actions-hover">
                    {isEdit ? (
                        <>
                            <button onClick={onSave} className="action-btn save-btn"><FiCheck /></button>
                            <button onClick={onCancelEdit} className="action-btn cancel-btn"><FiX /></button>
                        </>
                    ) : (
                        <>
                            <button onClick={onEdit} className="action-btn edit-btn"><FiEdit2 /></button>
                            <button onClick={onDelete} className="action-btn delete-btn"><FiTrash2 /></button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}