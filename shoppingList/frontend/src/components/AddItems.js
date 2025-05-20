import React, { useState, useEffect } from "react";
import axios from 'axios';

function AddItem() {
  const [itemNameAPI, setItemNameAPI] = useState("");
  const [itemPriceAPI, setItemPriceAPI] = useState("");
  const [itemTyping, setItemTyping] = useState("");
  // State to hold all items from the backend
  const [items, setItems] = useState([]);
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
    axios.post('http://localhost:5001/search', {
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
   * useEffect hook to load item data from the backend.
   * Executes only once on component mount.
   */
  useEffect(() => {
    fetch("http://localhost:5001/item")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error loading items:", err));
  }, []);

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

    fetch("http://localhost:5001/item", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemName: itemTyping,
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
          itemName: itemTyping,
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
   * Deletes an item from the backend and updates the local state.
   *
   * @param {number} itemId - The ID of the item to delete.
   */
  const deleteItem = (itemId) => {
    fetch(`http://localhost:5001/item/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.filter((item) => item.itemId !== itemId));
      })
      .catch((err) => console.error("Error deleting item:", err));
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
    console.log(`Updated item: ${updatedItem.name}, completed: ${updatedItem.completed}`);

    try {
      await fetch(`http://localhost:5001/item/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updatedItem.completed })
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
      <div className="addItemTitle">Add Item</div>

      <div className="topButton">
        <input
          className="itemInput"
          value={itemTyping}
          onChange={(e) => setItemTyping(e.target.value)}
          placeholder="Item name..."
        />
        <input className="itemAmount" placeholder="Amount of items..." />
        <button onClick={handleAPI}>Check product name and price</button>
        {itemNameAPI} {itemPriceAPI ? ` - ${itemPriceAPI}₪` : null}
      </div>

      <ul>
        {items.map((item) => (
          <div key={item.itemId}>
            <input
              type="checkbox"
              checked={item.completed === 1}
              onChange={() => handleCheckboxChange(item.itemId)}
              style={{ marginRight: '10px' }}
            />
            {item.itemName} {" -> Price:" + item.price+"₪"}
            <select
              value={item.quantity || 1}
              onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value))}
              style={{ margin: '0 10px' }}
            >
              {[...Array(10).keys()].map(n => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
            <button onClick={() => deleteItem(item.itemId)}>Remove</button>
          </div>
        ))}
      </ul>

      <div className="topButton">
        <select className="selectInput">
          <option value="" disabled selected hidden>Choose category...</option>
          <option>Dairy</option>
          <option>Bakery</option>
          <option>Meat</option>
          <option>Vegetables</option>
        </select>
        <button className="buttonAddItems" onClick={addItem}>Save</button>
        <button className="buttonAddItems">Cancel</button>
      </div>
    </div>
  );
}

export default AddItem;
