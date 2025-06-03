import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AiOutlineMenu } from "react-icons/ai";
import '../style/FamilysMenu.css'; // Add custom CSS here

export default  function FamilyMenu({ familysApp,selectedFamilyId }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleFamilyClick = (familyId) => {
    setIsOpen(false);
    selectedFamilyId(familyId)
  };

  return (
    <div className="familysMenu">
      <div 
        onClick={toggleMenu} 
        className={`menuTrigger ${ isOpen ? "active" : ""}`}
      >
        מאגר הקניות המשפחתי<AiOutlineMenu/>
      </div>

      {isOpen && (
        <div className="dropdownMenu">
          {familysApp.map((f, index) => (
            <div 
              key={index} 
              className="dropdownItem" 
              onClick={() => handleFamilyClick(f.familyId)}
            >
              {f.familyName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
