import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle } from "react-icons/md";
import '../style/ShoppingList.css'

export default function ItemShoppingList({ item }) {
    return( 
    <div className="item">
         <ImRadioUnchecked/>
         <div>{item}</div>
    </div>
        );
  }

