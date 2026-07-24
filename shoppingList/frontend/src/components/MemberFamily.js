import { SlUser } from "react-icons/sl";
import { MdManageAccounts } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import '../style/MemberFamily.css'; 

const Roles = {
      MANAGER: "admin",
      CHILD: "user"
}

// commponts of the fammliy members 
export default function MemberFamily({ MemberFamily, handleDeleteFamilyMember, handleUpdateFamilyMember, manager }) {
<<<<<<< HEAD
=======

      //Delete Family Member
      const handleDelete = () => {
            handleDeleteFamilyMember(MemberFamily.userId);
      };

      //Update Family Member - to admin
      const handleUpdate = () => {
            console.log("MemberFamily.userId", MemberFamily.userId);

            handleUpdateFamilyMember(MemberFamily.userId);
      };

>>>>>>> whatsapp1
      return (
            <div className="member-row">
                  <div className="member-actions">
                        <BsTrash 
                            className="action-icon trash" 
                            onClick={() => handleDeleteFamilyMember(MemberFamily.userId)} 
                        />
                        {MemberFamily.role !== Roles.MANAGER && (
                              <MdManageAccounts 
                                  className="action-icon manage" 
                                  onClick={() => handleUpdateFamilyMember(MemberFamily.userId)} 
                              />
                        )}
                  </div>
<<<<<<< HEAD

                  <div className={`member-badge ${MemberFamily.role === Roles.MANAGER ? 'admin-badge' : 'user-badge'}`}>
                        {MemberFamily.role}
                  </div>

                  <div className="member-info">
                        <span className="member-name">{MemberFamily.userName}</span>
                        <SlUser className="member-avatar" />
                  </div>
            </div>
      );
=======
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
>>>>>>> whatsapp1
};