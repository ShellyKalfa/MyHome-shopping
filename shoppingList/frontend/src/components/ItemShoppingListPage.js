import React from 'react';
// Styles
import { RiListCheck3 } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import '../style/ItemShoppingListPage.css'; // Ensure you have a separate CSS file for items

export default function ItemShoppingListPage({ shopping, handleSelectedShoppingId, handleDeleteFamily, choose }) {

   
    const handleClick = () => {
        handleSelectedShoppingId(shopping.listId);
    };

   
    const handleDelete = (e) => {
        e.stopPropagation(); 
        handleDeleteFamily(shopping.listId);
    };

    return (
        <div 
            className={`item-list-row ${choose ? 'selected-list' : ''}`} 
            onClick={handleClick}
        >
            <div className="item-content">
                <RiListCheck3 className="list-icon" />
                <span className="list-name">{shopping.listName}</span>
            </div>

            <button className="delete-action-btn" onClick={handleDelete} title="Delete List">
                <BsTrash />
            </button>
        </div>
    );
};