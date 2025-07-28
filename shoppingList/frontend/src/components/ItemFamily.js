
//style
import { PiUserListFill } from "react-icons/pi";
import { BsTrash } from "react-icons/bs";

// componnent of Item Family
export default function ItemFamily({ family, handleGetFamilyMembers, handleDeleteFamily, choose }) {
    /**
     * when click on family bring all the famliy members 
     */
    const handleClick = () => {
        handleGetFamilyMembers(family.familyId);
    };
    /**
     * when click delete family - only admin can 
     */
    const handleDelete = () => {
        handleDeleteFamily(family.familyId);
    };
    return (
        <>
            <div className={choose ? 'ItemFamily ItemFamilyChoosen' : 'ItemFamily'}  >
                <div>
                    <div className="iconText" onClick={handleClick} >
                        <PiUserListFill />
                        {family.familyName}
                    </div>
                </div>
                <div onClick={handleDelete}>
                    <BsTrash />
                </div>
            </div>
        </>);
};