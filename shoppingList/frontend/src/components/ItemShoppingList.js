import { ImRadioUnchecked } from "react-icons/im";
import { MdCheckCircle, MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/TempShoppingList.css'

export default function ItemShoppingList({ item,deleteItem }) {
  const onDelete = () => {
    deleteItem(item.itemId)
  }

    return (
        <div className="ItemShoppingList">
            <div className="listItem">
                {/* <ImRadioUnchecked/> */}
                <div className="circle">
                    <MdCheckCircle />
                </div>
                <div className="itemText" dir="auto">{item.itemName}</div>
                <div className="amountItem"> amount:{item.quantity}</div>
                <div className="priceItem"> price:{item.price}</div>
            </div>
            
            <div>
                <MdEdit />
              <div onClick={onDelete}>  <BsTrash  />  </div>

            </div>
        </div>
    );
}

