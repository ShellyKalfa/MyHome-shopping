
//style
import { RiListCheck3 } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";


export default function ItemShoppingListPage({ shopping, handleSelectedShoppingId, handleDeleteFamily, choose }) {

  const handleClick = () => {
    handleSelectedShoppingId(shopping.listId);
  };

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