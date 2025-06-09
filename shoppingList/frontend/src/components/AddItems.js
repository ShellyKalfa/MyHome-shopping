import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_BASE = 'http://localhost:5000/Shopping';

function AddItem({ items, setItems, listId }) {
    const [itemNameAPI, setItemNameAPI] = useState("");
    const [itemPriceAPI, setItemPriceAPI] = useState("");
    const [itemTyping, setItemTyping] = useState("");
    const [quantityTyping, setQuantityTyping] = useState("1");
    // State to track the input value for a new item
    const [suggestions, setSuggestions] = useState([]);


    /**
 * Adds a new item to the backend and updates the local state.
 * Prevents duplicates and ensures the price is properly parsed.
 */
    const addItem = async () => {
        const trimmed = itemTyping.trim().toLowerCase();
        if (trimmed === "") return;

        if (items.some(item => item.itemName.toLowerCase() === trimmed)) {
            alert("This item already exists!");
            return;
        }
        if(itemPriceAPI.length < 1  || itemNameAPI < 2){
            alert("choose an item!");
            return;
        }
        
console.log("quantity", quantityTyping );


        if (!quantityTyping || isNaN(quantityTyping) || parseInt(quantityTyping) <= 0 ||  parseFloat(quantityTyping) % 1 != 0){
            alert("Not valid number!")
            return;
        }
          
        try {
            const res = await fetch(`${API_BASE}/item/${listId}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    itemName: itemNameAPI,
                    quantity: quantityTyping,
                    price: itemPriceAPI
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error);
            }

            const data = await res.json();
            
            setItems([...items, {
                itemId: data.itemId,
                itemName: itemNameAPI,
                quantity: quantityTyping,
                price: itemPriceAPI
            }]);

            setItemTyping("");
            setQuantityTyping("1");
            setSuggestions([]);
        } catch (err) {
            alert("Error adding item: " + err.message);
            console.error("Error adding item:", err);
        }
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

        try {
            await fetch(`http://localhost:5000/item/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: updatedItem.completed })
            })
                .then(res => res.json())
                .then(() => {
                    // Refresh item list from backend
                    fetch("http://localhost:5000/item")
                        .then(res => res.json())
                        .then(data => setItems(data))
                        .catch(err => console.error("Failed to reload items list:", err));
                });
        } catch (error) {
            console.error('Failed to update checkbox state:', error);
        }
    };

    /**
    * Updates the quantity of an item and syncs the change with the backend.
    *
    * @param {number} id - The ID of the item to update.
    * @param {number} quantity - The new quantity value.
    */
    const handleQuantityChange = async (id, quantity) => {
        const updatedItems = items.map(f =>
            f.itemId === id
                ? { ...f, quantity }
                : f
        );

        setItems(updatedItems);

        const updatedItem = updatedItems.find(f => f.itemId === id);

        try {
            await fetch(`http://localhost:5000/item/${id}/quantity`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: updatedItem.quantity })
            })
                .then(res => res.json())
                .then(() => {
                    // Refresh item list from backend
                    fetch("http://localhost:5000/item")
                        .then(res => res.json())
                        .then(data => setItems(data))
                        .catch(err => console.error("Failed to reload items list:", err));
                });
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };


       /**
     * Fetches item details (name and price) from the Rami Levi API based on the typed item name.
     * Updates local state with the name and parsed price.
     * as auto complition
     * @param {Event} event - The form submission event.
     */

    const handleChange = (event) => {
        event.preventDefault();
        let text = event.target.value;
        setItemTyping(text)
        if (text.length > 1) {
            axios.post(`${API_BASE}/search`, {
                aggs: 1,
                q: text,
                store: 331
            })
                .then(res => {
                    if (res.data && res.data.data) {
                        const results = res.data.data.map(product =>
                        ({
                            "productName": product.name,
                            "productPrice": product.price.price,
                            "productCatgory": product.department.name
                        }));
                        setSuggestions(results.slice(0, 10));
                    }
                })
                .catch(err => console.error("Autocomplete from API error", err));
        }
        else {
            setSuggestions([])
        }
    }


 


    const handleOnClick = (product) => {
        setItemNameAPI(product.productName);
        setItemPriceAPI(parseFloat(product.productPrice));
        setItemTyping(product.productName);
        setSuggestions([]);
    }

    return (

        <div className="box">
            < div className="addItemTitle">add item</div>
            <div className="topButton">
                <input className="itemInput"
                    value={itemTyping}
                    onChange={(event) => handleChange(event)}
                    placeholder="Item name..."
                    dir="rtl" />

                {(suggestions.length > 0 && itemTyping.length > 1) ? (
                    <ul className="autocomplete-list">
                        {suggestions.map((product, idx) => (
                            <li key={idx} onClick={() => {
                                handleOnClick(product);
                            }}>
                                {product.productName}
                            </li>
                        ))}
                    </ul>
                ) : <></>}

            </div>

            <div className="topButton">
                <input className="quantityInput"
                    value={quantityTyping}
                    onChange={(event) => setQuantityTyping(event.target.value)}
                    placeholder="quantity name..."/>
            </div>



            <div className="topButton">
                <button className="buttonAddItems" onClick={addItem}> save  </button>
                <button className="buttonAddItems"> cancel  </button>
            </div>

        </div>);
}

export default AddItem;