import { PiUserListFill } from "react-icons/pi";

import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default function ItemFamily({family}) {
    return (  <div className="ItemFamliy">
        <div className="iconText">
                <PiUserListFill />
                {family}
        </div>
        <div>
            <MdEdit  />
            <BsTrash />
         </div>
    </div>);
};