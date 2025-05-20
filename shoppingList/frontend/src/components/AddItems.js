import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

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
        axios.post(`${API_BASE}/Shopping/search`, {
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
    ;



    return (

        <div className="box">
            < div className="addItemTitle">add item</div>
            <div className="topButton">
                <input className="itemInput"
                    value={itemTyping}
                    onChange={(e) => setItemTyping(e.target.value)}
                    placeholder="Item name..."
                    dir="rtl" />
                <button className="buttonAddItems"> save  </button>

            </div>
            <div className="topButton">
                <input className="itemAmount" placeholder=" amount of items... " />

                <button className="buttonAddItems"> cancel  </button>
            </div>
            <div className="topButton">
                <label className="itemAmount"  >
                     {itemPriceAPI ? `${itemNameAPI} - ${itemPriceAPI}₪` : "check the price"}
                </label>

                <button className="buttonAddItems"  onClick={handleAPI}> check price  </button>
            </div>

        </div>);
}

export default AddItem;