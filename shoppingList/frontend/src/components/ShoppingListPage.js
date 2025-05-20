import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styles
import '../style/ShoppingListPage.css';

export default function ShoppingListPage({selectedFamilyId}) {
const [shoppingFamily,setShoppingFamily]=useState([])
useEffect(() => {
console.log("shoppingFamily", shoppingFamily);

}, [shoppingFamily]);

useEffect(() => {
    console.log("user", selectedFamilyId);

    if (selectedFamilyId) {
      axios.post(`http://localhost:5000/Shopping/shoppingFamily/${selectedFamilyId}`, {})
        .then(res => {
          console.log(res.data)
          if (res.data.success) {
            console.log(res.data.data)
            if (res.data.data != null) {
              setShoppingFamily(res.data.data)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [selectedFamilyId]);

    return (<div className={`ShoppingListPage ${shoppingFamily.length > 0 ? 'Block' : 'none'}`}>

        {
  shoppingFamily.length > 0 ? (
    <div>
      {shoppingFamily.map((shopping, index) => (
        <div key={index}>{shopping.listName}</div>
      ))}
    </div>
  ) : (
    <div></div>
  )
}

    </div>  );


};
//className={isVisible ? 'Block' : 'none'}