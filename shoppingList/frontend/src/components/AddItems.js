import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_BASE = 'http://localhost:5000/Shopping';

function AddItem({ items, setItems, listId }) {
    const [itemNameAPI, setItemNameAPI] = useState("");
    const [itemPriceAPI, setItemPriceAPI] = useState("");
    const [itemTyping, setItemTyping] = useState("");
    // State to track the input value for a new item
    const [newItem, setNewItem] = useState("");

    /**
     * Fetches item details (name and price) from the Rami Levi API based on the typed item name.
     * Updates local state with the name and parsed price.
     *
     * @param {Event} event - The form submission event.
     */
    const handleAPI = (event) => {
        event.preventDefault();
        axios.post(`${API_BASE}/search`, {
            aggs: 1,
            q: itemTyping,
            store: 331
        })
            .then(res => {
                console.log(res.data);
                setItemNameAPI(res.data.data[0].name);
                setItemPriceAPI(res.data.data[0].price);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };
    /**
 * Adds a new item to the backend and updates the local state.
 * Prevents duplicates and ensures the price is properly parsed.
 */
    const addItem = () => {
        const trimmed = itemTyping.trim().toLowerCase();
        if (trimmed === "") return;

        // Check for duplicates locally
        if (items.some(item => item.itemName.toLowerCase() === trimmed)) {
            alert("This item already exists!");
            return;
        }

        fetch(`${API_BASE}/item/${listId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                itemName: itemNameAPI,
                quantity: 1,
                price: parseFloat(itemPriceAPI)
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.error); });
                }
                return res.json();
            })
            .then((data) => {
                setItems([...items, {
                    itemId: data.itemId,
                    itemName: itemNameAPI,
                    price: parseFloat(itemPriceAPI)
                }]);
                setNewItem("");
            })
            .catch((err) => {
                alert("Error adding item: " + err.message);
                console.error("Error adding item:", err);
            });
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
        console.log(`Updated item: ${updatedItem.name}, quantity: ${updatedItem.quantity}`);

        try {
            await fetch(`http://localhost:5001/item/${id}/quantity`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: updatedItem.quantity })
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
            console.error('Failed to update quantity:', error);
        }
    };



    return (

        <div className="box">
            < div className="addItemTitle">add item</div>
            <div className="topButton">
                <input className="itemInput"
                    value={itemTyping}
                    onChange={(e) => setItemTyping(e.target.value)}
                    placeholder="Item name..."
                    dir="rtl" />
                <button onClick={handleAPI}>Check product name and price</button>


            </div>
            <div className="topButton">
                <input className="itemAmount" placeholder=" amount of items... " />
                <button className="buttonAddItems" onClick={addItem}> save  </button>
                <button className="buttonAddItems"> cancel  </button>
            </div>
            <div className="topButton">
                <label className="itemAmount"  >
                    {itemPriceAPI ? `${itemNameAPI} - ${itemPriceAPI}₪` : "check the price"}
                </label>

                <button className="buttonAddItems" onClick={handleAPI}> check price  </button>
            </div>

        </div>);
}

export default AddItem;