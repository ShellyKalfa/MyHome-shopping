
//style
import { RiListCheck3 } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";

// componnet of the side menu that hold the shopping listts 
export default function ItemShoppingListPage({ shopping, handleSelectedShoppingId, handleDeleteFamily, choose }) {

  // on click on shopping list item open the shoping list 
  const handleClick = () => {
    handleSelectedShoppingId(shopping.listId, shopping.listName);
  };

  // delete shopping list item from family 
  const handleDelete = () => {
    handleDeleteFamily(shopping.listId);
  };
  return (
    <>
      <div className={choose ? 'ItemFamily Chosen' : 'ItemFamily'}  >
        <div>
          <div className="iconText" onClick={handleClick} >
            <RiListCheck3 />
            {shopping.listName}
          </div>
        </div>
        <div onClick={handleDelete}>
          <BsTrash />
        </div>
      </div>
    </>);
};