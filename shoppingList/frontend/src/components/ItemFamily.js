
//style
import { PiUserListFill } from "react-icons/pi";
import { BsTrash } from "react-icons/bs";

export default function ItemFamily({ family, handleGetFamilyMembers, handleDeleteFamily, choose }) {

    const handleClick = () => {
        handleGetFamilyMembers(family.familyId);
    };

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