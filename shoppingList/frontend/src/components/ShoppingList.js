import AddItem from "./AddItems";
import React, { useEffect, useState } from 'react';

import "../style/ShoppingList.css"
import TempShoppingList from "./TempShoppingList";



export default function ShoppingList() {
  const [items,setItems]=useState(["milk","apple","eggs","bread"])

    return ( 
<div className="shoppingListBord">
    {/* <h1>ShoppingList</h1> */}
    
    <AddItem/>
    <div className="boardSizeShoppingList">
             <TempShoppingList items={items} />
    </div>
</div>

     )
}
;