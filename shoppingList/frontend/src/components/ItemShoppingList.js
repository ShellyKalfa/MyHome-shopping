import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle,MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css'

export default function ItemShoppingList({ item }) {
    return( 
    <div className="ItemShoppingList">
        <div className="listItem">
                {/* <ImRadioUnchecked/> */}
                <div className="circle">
                   <MdCheckCircle />
                </div>
               
                
                <div className="itemText">{item}</div>
                <div className="amountItem"> amount: 2</div>
              
         </div>
           
         <div>
                <MdEdit  />
                <BsTrash />
         </div>
    </div>
        );
  }

