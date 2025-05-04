import React, { useState, useEffect } from 'react';
import ItemShoppingList from "./ItemShoppingList";
import '../style/ShoppingList.css'


export default  function TempShoppingList() {
 const [items,setItems]=useState(["milk","apple","eggs","bread"])

    return ( 
    <div className='ShoppingList'>
        <div className='board'> 
            <div>
                <h2>Shopping List </h2>
                <div className='board-items '>
                        {items.map((item, index) => (
                                <ItemShoppingList key={index} item={item} />
                        ))}
                </div>
             </div>
                <button className='bigButton'> Send To Wolt </button>
        </div>
    </div>
    );
}
