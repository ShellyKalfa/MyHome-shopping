import { useState } from "react";
import ShoppingList from "./ShoppingList";
import axios from 'axios';


export default function ShoppingListFile() {
    const [item,setItem]=useState("")
     const  handleSignUp = (event) => {
        event.preventDefault();
     axios.post('http://localhost:5000/search', {"aggs": 1,"q": "גבינה",  "store": 331})
          .then(res => { 
            
            console.log(res.data);
            setItem(res.data.data[0].name);

          })
          .catch(err => {console.log(err.response.data)})

     
    }
    return ( 
<div>
    <ShoppingList/>
    <button onClick={handleSignUp}>Sign Up</button>
    <div> {item}</div>
</div>

     )
}
;