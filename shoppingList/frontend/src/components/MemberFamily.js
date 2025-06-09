import { SlUser } from "react-icons/sl";
import { MdManageAccounts } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
const Roles = {
  MANAGER: "Admin",
  CHILD: "Member"
}

export default function MemberFamily({ MemberFamily, handleDeleteFamilyMember, handleUpdateFamilyMember, manager }) {
      const handleDelete = () => {
            handleDeleteFamilyMember(MemberFamily.userId);
      };
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
              {console.log(MemberFamily.role == Roles.MANAGER )}
                  <div className="role">{MemberFamily.role}</div>
                  {/*{manager ?*/}
                        <div>

                              {MemberFamily.role == Roles.MANAGER ? <></> :
                                <MdManageAccounts onClick={handleUpdate} />}
                               <BsTrash onClick={handleDelete} />
                        </div>
                    {/*: <></>}*/}
            </div>);
};