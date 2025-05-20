import { SlUser } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default function MemberFamily({MemberFamily}) {
    return (
         <div className="ItemFamliy">
               <div className="iconText">
                     <SlUser />
                     {MemberFamily}
              </div>
              <div className="role">Maneger </div>
               <div>
                              <MdEdit  />
                              <BsTrash />
                       </div>
         </div> );
};