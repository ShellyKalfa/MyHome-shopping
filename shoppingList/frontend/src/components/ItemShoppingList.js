import React, { useState } from "react";
import axios from 'axios';

import { ImRadioUnchecked,ImCheckmark  } from "react-icons/im";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css';


const API_BASE = 'http://localhost:5000/Shopping';



export default function ItemShoppingList({ item, deleteItem,updateItem }) {
    const [newItem, setNewItem] = useState(item.itemName)
    const [itemNameAPI, setItemNameAPI] = useState("");
    const [itemPriceAPI, setItemPriceAPI] = useState("");
    const [isEdit,setIsEdit]=useState(false)
    // State to track the input value for a new item
    const [suggestions, setSuggestions] = useState([]);
    const [itemTyping, setItemTyping] = useState("");

    const onEdit=()=>{
        setIsEdit(true)
        setNewItem('');           // clear input
        setItemTyping('');        // clear typing
        setSuggestions([]);       // clear old suggestions
    }
    const onSave=()=>{
        setIsEdit(false)
        renameItem();
    }
    const onDelete = () => {
        deleteItem(item.itemId)
    }
   const toggleCompleted = async () => {
        try {
            const response = await axios.patch(`${API_BASE}/item/${item.itemId}`, {
                completed: !item.completed
            });
            if (updateItem) updateItem(item.itemId, { completed: !item.completed });  // optional state update
        } catch (err) {
            console.error('Failed to update item status:', err);
        }
    };

           /**
     * Fetches item details (name and price) from the Rami Levi API based on the typed item name.
     * Updates local state with the name and parsed price.
     * as auto complition
     * @param {Event} event - The form submission event.
     */

    const handleAutoComplete = (event) => {
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
/**
 * Sends a PATCH request to update the item's name and price on the server.
 */

const renameItem = async () => {
  const newName = newItem?.trim(); // use `newItem`, not `itemTyping`
  if (!newName) return;

  try {
    const res = await fetch(`${API_BASE}/item/${item.itemId}/name`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newName,
        price: itemPriceAPI ?? item.price,
        listId: item.listId   
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setNewItem(newName);
    setIsEdit(false);
    setItemTyping("");
    setSuggestions([]);

    if (typeof updateItem === 'function') {
      updateItem(item.itemId, {
        itemName: newName,
        price: itemPriceAPI ?? item.price
      });
    }

  } catch (err) {
    alert("Error renaming item: " + err.message);
  }
};




    const handleOnClick = (product) => {
        setItemNameAPI(product.productName);
        setItemPriceAPI(parseFloat(product.productPrice));
        setItemTyping(product.productName);
        setNewItem(product.productName); 
        setSuggestions([]);
    }

    return (
        <div className="ItemShoppingList">
            <div  onClick={toggleCompleted}>
                {item.completed ? <MdCheckCircle /> : <ImRadioUnchecked />}
            </div>

            <div className="listItem">
                <div className={`itemText ${item.completed? 'crossText' : ''}`}d dir="auto">{isEdit ? (
                <div className="autocomplete-wrapper">
                    <input
                        value={newItem}
                        onChange={(e) => {
                            setNewItem(e.target.value);
                            handleAutoComplete(e); // trigger suggestions
                        }}
                        placeholder="Enter item name"
                    />
                    {(suggestions.length > 0 && newItem.length > 1 &&
                        newItem.trim().toLowerCase() !== item.itemName.trim().toLowerCase()) ? (
                        <ul className="autocomplete-list">
                            {suggestions.map((product, idx) => (
                                <li key={idx} onClick={() => handleOnClick(product)}>
                                    {product.productName}
                                </li>
                        ))}
                    </ul>
                ) : <></>}
                
                </div>
            ) : (
                item.itemName
            )}


                </div>
                 <img
                    src={`https://img.rami-levy.co.il${item.image}`}
                    alt="FAILD"
                    style={{ width: '100px', height: 'auto' }}
                />

                <div className="amountItem"> amount:{item.quantity}</div>
                <div className="priceItem"> price:{item.price}</div>
            </div>

            <div>
             {  isEdit ? <ImCheckmark  onClick={onSave}/> :<MdEdit  onClick={onEdit}/>}
                <div onClick={onDelete}>  <BsTrash />  </div>

            </div>
        </div >
    )
};

