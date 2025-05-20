import { useState } from "react";
import ShoppingList from "./ShoppingList";
import axios from 'axios';


export default function ShoppingListFile() {
    const [itemName,setItemNAme]=useState("")
    const [itemPrice, setItemPrice] = useState("");
     const  handleSignUp = (event) => {
        event.preventDefault();
     axios.post('http://localhost:5001/search', {"aggs": 1,"q": "גבינה",  "store": 331})
          .then(res => { 
            
            console.log(res.data);
            setItemNAme(res.data.data[0].name);
            setItemPrice(res.data.data[0].price.price);

          })
          .catch(err => {console.log(err.response.data)})
     
    }
    return ( 
  <div>
  <button onClick={handleSignUp}>check product</button>{itemName} - {itemPrice}
      <ShoppingList/>
  </div>

     )
}
;