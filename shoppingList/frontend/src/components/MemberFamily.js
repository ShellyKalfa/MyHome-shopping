import { SlUser } from "react-icons/sl";
import { MdManageAccounts } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
const Roles = {
      MANAGER: "admin",
      CHILD: "user"
}

// commponts of the fammliy members 
export default function MemberFamily({ MemberFamily, handleDeleteFamilyMember, handleUpdateFamilyMember, manager }) {

      //Delete Family Member
      const handleDelete = () => {
            handleDeleteFamilyMember(MemberFamily.userId);
      };

      //Update Family Member - to admin
      const handleUpdate = () => {
            console.log("MemberFamily.userId", MemberFamily.userId);

            handleUpdateFamilyMember(MemberFamily.userId);
      };

      return (
            <div className="ItemFamily">
                  <div className="iconText">
                        <SlUser />
                        {MemberFamily.userName}
                  </div>
                  {console.log(MemberFamily.role == Roles.MANAGER)}
                  <div className="role">{MemberFamily.role}</div>
                  {/*{Roles.MANAGER?*/}
                  <div>

                        {MemberFamily.role == Roles.MANAGER ? <></> :
                              <MdManageAccounts onClick={handleUpdate} />}
                        <BsTrash onClick={handleDelete} />
                  </div>
                  {/*: <></>}*/}
            </div>);
};