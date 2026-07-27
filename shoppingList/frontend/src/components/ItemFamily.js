import React from 'react';
import { PiUserListFill } from "react-icons/pi";
import { BsTrash } from "react-icons/bs";
import '../style/ItemFamily.css'; 

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