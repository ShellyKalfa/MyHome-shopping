import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// אייקונים מודרניים ונקיים יותר
import { FiChevronDown, FiChevronUp, FiUsers } from "react-icons/fi";
import '../style/FamilysMenu.css';

<<<<<<< HEAD
=======
//drop down Family Menu
>>>>>>> whatsapp1
export default function FamilyMenu({ familysApp, selectedFamilyId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // משמש לסגירה כשלוחצים בחוץ

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleFamilyClick = (familyId) => {
    setIsOpen(false);
    selectedFamilyId(familyId);
  };

<<<<<<< HEAD
  // סגירת התפריט בלחיצה מחוץ לקומפוננטה (UX בסיסי)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
=======
  return (
    <div className="familysMenu">
      <div
        onClick={toggleMenu}
        className={`menuTrigger ${isOpen ? "active" : ""}`}
      >
        מאגר הקניות המשפחתי<AiOutlineMenu />
      </div>
>>>>>>> whatsapp1

  return (
    <div className="family-menu-container" ref={dropdownRef}>
      
      {/* הכפתור הראשי */}
      <button 
        onClick={toggleMenu} 
        className={`menu-trigger ${isOpen ? "active" : ""}`}
      >
        <span className="trigger-icon"><FiUsers /></span>
        <span className="trigger-text">מאגר הקניות המשפחתי</span>
        <span className="trigger-arrow">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      {/* התפריט הנפתח */}
      {isOpen && (
<<<<<<< HEAD
        <div className="dropdown-menu">
          {familysApp && familysApp.length > 0 ? (
            familysApp.map((f, index) => (
              <div 
                key={f.familyId || index} 
                className="dropdown-item" 
                onClick={() => handleFamilyClick(f.familyId)}
              >
                {f.familyName}
              </div>
            ))
          ) : (
            <div className="dropdown-item empty">
              אין משפחות זמינות
=======
        <div className="dropdownMenu">
          {familysApp.map((f, index) => (
            <div
              key={index}
              className="dropdownItem"
              onClick={() => handleFamilyClick(f.familyId)}
            >
              {f.familyName}
>>>>>>> whatsapp1
            </div>
          )}
        </div>
      )}
    </div>
  );
};