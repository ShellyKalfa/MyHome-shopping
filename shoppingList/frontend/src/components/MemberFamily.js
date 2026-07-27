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

                  <div className={`member-badge ${MemberFamily.role === Roles.MANAGER ? 'admin-badge' : 'user-badge'}`}>
                        {MemberFamily.role}
                  </div>

                  <div className="member-info">
                        <span className="member-name">{MemberFamily.userName}</span>
                        <SlUser className="member-avatar" />
                  </div>
            </div>
      );
};