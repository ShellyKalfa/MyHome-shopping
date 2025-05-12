import React, { useState, useEffect } from 'react';
import ItemShoppingList from "./ItemShoppingList";
import '../style/TempShoppingList.css'


export default  function TempShoppingList( { items }) {
 

    return ( 
        <div className='board'> 
            <div className='flex'>
                <h2>Shopping List </h2>
                <div className='board-items '>
                        {items.map((item, index) => (
                                <ItemShoppingList key={index} item={item} />
                        ))}
                </div>
             </div>
                <button className='bigButton'> Send To Wolt </button>
        </div>
    );
}
