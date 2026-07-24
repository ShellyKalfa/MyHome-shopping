import React from 'react';
// Styles
import { RiListCheck3 } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
<<<<<<< HEAD
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
=======

// componnet of the side menu that hold the shopping listts 
export default function ItemShoppingListPage({ shopping, handleSelectedShoppingId, handleDeleteFamily, choose }) {

  // on click on shopping list item open the shoping list 
  const handleClick = () => {
    handleSelectedShoppingId(shopping.listId, shopping.listName);
  };

  // delete shopping list item from family 
  const handleDelete = () => {
    handleDeleteFamily(shopping.listId);
  };
  return (
    <>
      <div className={choose ? 'ItemFamily Chosen' : 'ItemFamily'}  >
        <div>
          <div className="iconText" onClick={handleClick} >
            <RiListCheck3 />
            {shopping.listName}
          </div>
>>>>>>> whatsapp1
        </div>
    );
};