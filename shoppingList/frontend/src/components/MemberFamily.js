import { SlUser } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default function MemberFamily({MemberFamily}) {
    return (
         <div className="ItemFamily">
               <div className="iconText">
                     <SlUser />
                     {MemberFamily.userName}
              </div>
              <div className="role">{MemberFamily.role}</div>
               <div>
                              <MdEdit  />
                              <BsTrash />
                       </div>
         </div> );
};