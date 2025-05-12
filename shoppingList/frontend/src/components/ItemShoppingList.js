import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle,MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css'

export default function ItemShoppingList({ item }) {
    return( 
    <div className="item">
        <div className="listItem">
                <ImRadioUnchecked/>
                <div>{item}</div>
         </div>
         <div>
                <MdEdit  />
                <BsTrash />
         </div>
    </div>
        );
  }

