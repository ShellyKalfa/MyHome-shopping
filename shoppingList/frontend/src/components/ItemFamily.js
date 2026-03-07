import React from 'react';
import { PiUserListFill } from "react-icons/pi";
import { BsTrash } from "react-icons/bs";
import '../style/ItemFamily.css'; 

export default function ItemFamily({ family, handleGetFamilyMembers, handleDeleteFamily, choose }) {

    return (
        <div className={`ItemFamily-container ${choose ? 'selected' : ''}`}>
            
            {/* Clickable Area: Name and Icon */}
            <div className="family-info-group" onClick={() => handleGetFamilyMembers(family.familyId)}>
                <PiUserListFill className="family-icon" />
                <span className="family-name">{family.familyName}</span>
            </div>

            <div 
                className="delete-action" 
                onClick={(e) => {
                    e.stopPropagation(); 
                    handleDeleteFamily(family.familyId);
                }}
            >
                <BsTrash size={18} />
            </div>
            
        </div>
    );
};