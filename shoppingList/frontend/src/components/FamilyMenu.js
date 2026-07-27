import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// אייקונים מודרניים ונקיים יותר
import { FiChevronDown, FiChevronUp, FiUsers } from "react-icons/fi";
import '../style/FamilysMenu.css';

//drop down Family Menu
export default function FamilyMenu({ familysApp, selectedFamilyId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // משמש לסגירה כשלוחצים בחוץ

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleFamilyClick = (familyId) => {
    setIsOpen(false);
    selectedFamilyId(familyId);
  };

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
            </div>
          )}
        </div>
      )}
    </div>
  );
};