import React, { useState } from "react";
import axios from 'axios';

import { ImRadioUnchecked, ImCheckmark } from "react-icons/im";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
//import '../style/TempShoppingList.css';
import '../style/ItemShoppingList.css';

const API_BASE = 'http://localhost:5000/Shopping';

export default function ItemShoppingList({ item, deleteItem, updateItem }) {
    const [newItem, setNewItem] = useState(item.itemName);
    const [itemPriceAPI, setItemPriceAPI] = useState(item.price);
    const [itemDepartment, setItemDepartment] = useState(item.department);
    const [itemImage, setItemImage] = useState(item.image || "");
    const [isEdit, setIsEdit] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isAmountEdit, setIsAmountEdit] = useState(false);
    const [newAmount, setNewAmount] = useState(item.quantity);

    const onEdit = () => {
        setIsEdit(true);
        setNewItem('');
        setSuggestions([]);
    };

    const onSave = () => {
        setIsEdit(false);
        renameItem();
    };

    const onDelete = () => {
        deleteItem(item.itemId);
    };

    const amountEdit = () => {
        setIsAmountEdit(true);
        setNewAmount(item.quantity);
    };

    const amountSave = () => {
        changeAmount();
        setIsAmountEdit(false);
    };

    // NEW toggleCompleted function - edited by idoaz1 in 10/6/2025
    const toggleCompleted = async () => {
        try {
            const newCompletedStatus = item.completed === 0 ? 1 : 0;

            const response = await axios.patch(`${API_BASE}/item/${item.itemId}`, {
                completed: newCompletedStatus
            });

            if (updateItem) {
                updateItem(item.itemId, {
                    ...item,
                    completed: newCompletedStatus
                });
            }
        } catch (err) {
            console.error('Failed to update item status:', err);
        }
    };

    const handleAutoComplete = (event) => {
        const text = event.target.value;
        setNewItem(text);

        if (text.length > 1) {
            axios.post(`${API_BASE}/search`, {
                aggs: 1,
                q: text,
                store: 331
            })
                .then(res => {
                    if (res.data && res.data.data) {
                        const results = res.data.data.map(product => ({
                            productName: product.name,
                            productPrice: product.price.price,
                            productCategory: product.department?.name || "כללי",
                            productImage: product.images.small || ""
                        }));
                        setSuggestions(results.slice(0, 10));
                    }
                })
                .catch(err => console.error("Autocomplete from API error", err));
        } else {
            setSuggestions([]);
        }
    };

    const renameItem = async () => {
        const newName = newItem?.trim();
        if (!newName) {
            setItemPriceAPI(parseFloat(item.price));
            setNewItem(item.itemName);
            setItemDepartment(item.department);
            setItemImage(item.image);
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/item/${item.itemId}/name`, {
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

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setNewItem(newName);
            setIsEdit(false);
            setSuggestions([]);

            if (typeof updateItem === 'function') {
                updateItem(item.itemId, {
                    itemName: newName,
                    price: itemPriceAPI,
                    department: itemDepartment,
                    image: itemImage,
                });
            }
        } catch (err) {
            alert("Error updating item: " + err.message);
        }
    };

    const changeAmount = async () => {
        const quantity = parseInt(newAmount);
        if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/item/${item.itemId}/quantity`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setNewAmount(quantity);
            if (typeof updateItem === "function") {
                updateItem(item.itemId, { quantity });
            }
        } catch (err) {
            alert("Failed to update amount: " + err.message);
        }
    };

    const handleOnClick = (product) => {
        setItemPriceAPI(parseFloat(product.productPrice));
        setNewItem(product.productName);
        setItemDepartment(product.productCategory);
        setItemImage(product.productImage);
        setSuggestions([]);
    };



    return (
        <div className="item-list-container">
                <div className="Item-container">
                    <div className="item-general">
                        <div className="left-section">
                            <div className="toggle-completed" onClick={toggleCompleted}>
                                {item.completed ? <MdCheckCircle /> : <ImRadioUnchecked />}
                            </div>
                            <img
                                src={itemImage ? `https://img.rami-levy.co.il${itemImage}` : `https://img.rami-levy.co.il${item.image}`}
                                alt="Item"
                                className="image imageList"
                            />
                        </div>

                        <div className="center-section">
                            <div className={`itemInfo ${item.completed ? 'crossText' : ''}`}>
                                <div className="itemName">{item.itemName}</div>
                                <div>מחלקה: {itemDepartment}</div>
                                <div>
                                    {isAmountEdit ? (
                                        <div className="amountEditWrapper">
                                            <input
                                                type="number"
                                                value={newAmount}
                                                onChange={(e) => setNewAmount(e.target.value)}
                                                placeholder="עדכן כמות"
                                                className="amountInput"
                                            />
                                            <ImCheckmark onClick={amountSave} />
                                        </div>
                                    ) : (
                                        <>
                                             {item.quantity}       יח'        <MdEdit onClick={amountEdit} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <div className="price-and-edit">
                            <div className="price">{(itemPriceAPI * item.quantity).toFixed(2)} ₪</div>
                            <div className="edit-icon">
                                {isEdit ? <ImCheckmark onClick={onSave} /> : <MdEdit onClick={onEdit} />}
                            </div>
                        </div>
                        <div className="trash-icon">
                            {isEdit ? (
                                <div className="autocomplete-wrapper">
                                    <input
                                        value={newItem}
                                        onChange={handleAutoComplete}
                                        placeholder="עדכון מוצר"
                                    />
                                    {suggestions.length > 0 && newItem.length > 1 &&
                                        newItem.trim().toLowerCase() !== item.itemName.trim().toLowerCase() && (
                                            <ul className="autocomplete-list listEdit">
                                                {suggestions.map((product, idx) => (
                                                    <li key={idx} onClick={() => handleOnClick(product)}>
                                                        <div className="productName">{product.productName}</div>
                                                        <img
                                                            className="image"
                                                            src={`https://img.rami-levy.co.il${product.productImage}`}
                                                            alt="image"
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                </div>
                            ) : (
                                <BsTrash onClick={onDelete} />
                            )}
                        </div>

                    </div>
                </div>
        </div>

    );

    /*
    this is ido's old version before omer's redesign
    return (
        <div className="ItemShoppingList">
            <div onClick={toggleCompleted}>
                {item.completed ? <MdCheckCircle /> : <ImRadioUnchecked />}
            </div>

            <div className="listItem">
                <div className={`itemText ${item.completed ? 'crossText' : ''}`} dir="auto">
                    {isEdit ? (
                        <div className="autocomplete-wrapper">
                            <input
                                value={newItem}
                                onChange={handleAutoComplete}
                                placeholder="עדכון מוצר"
                            />
                            {(suggestions.length > 0 && newItem.length > 1 &&
                                newItem.trim().toLowerCase() !== item.itemName.trim().toLowerCase()) ? (
                                <ul className="autocomplete-list  listEdit">
                                    {suggestions.map((product, idx) => (
                                        <li key={idx} onClick={() => handleOnClick(product)}>
                                            <div className="productName">{product.productName}</div>
                                            <img className="image"
                                                src={`https://img.rami-levy.co.il${product.productImage}`}
                                                alt="failed to present image"

                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ) : (
                        item.itemName
                    )}
                </div>



                <div className="amountItem">
                    {isAmountEdit ? (
                        <div className="amountEditWrapper">
                            <input
                                type="number"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="amountInput"
                            />
                            <ImCheckmark onClick={amountSave} />
                        </div>
                    ) : (
                        <>
                            כמות: {item.quantity} <MdEdit onClick={amountEdit} />
                        </>
                    )}
                </div>
                <div className="priceItem">
                    מחיר: {itemPriceAPI} ({(itemPriceAPI * newAmount).toFixed(2)}₪)
                </div>
                <div className="departmentItem">
                    מחלקה: {itemDepartment}
                </div>
            </div>
            <img
                src={itemImage ? `https://img.rami-levy.co.il${itemImage}` : `https://img.rami-levy.co.il${item.image}`}
                alt="Item"
                className="image imageList"
            />

            <div className="deleteEdit">
                {isEdit ? <ImCheckmark onClick={onSave} /> : <MdEdit onClick={onEdit} />}
                <div onClick={onDelete}><BsTrash /></div>
            </div>
        </div>
    );
    * */
}
