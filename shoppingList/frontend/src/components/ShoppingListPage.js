import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import ItemShoppingListPage from './ItemShoppingListPage';

// Styles
import '../style/ShoppingListPage.css';
import { BsPlusLg } from "react-icons/bs"; // אייקון נקי יותר לפלוס
import { AiOutlineClose, AiOutlineDoubleLeft } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa"; // אייקון למוצרים בבית

// API
import { createShoppingFamily, getShoppingFamily, deleteShoppingFamily } from '../api/shopping';

export default function ShoppingListPage({ user, familysApp, selectedFamilyId, selectedShoppingId, setSelectedShoppingId }) {
    const [shoppingFamily, setShoppingFamily] = useState([]);
    const [newShoppingFamilyName, setNewShoppingFamilyName] = useState('');
    const [close, setClose] = useState(true);
    
    // מציאת שם המשפחה הנבחרת
    const selectedFamily = familysApp.find(family => family.familyId === selectedFamilyId);
    const [selectedFamilyName, setSelectedFamilyName] = useState(selectedFamily ? selectedFamily.familyName : '');
    
    const navigate = useNavigate();

    const handleSelectedShoppingId = (ShoppingId) => {
        setSelectedShoppingId(ShoppingId);
        setClose(true); // סוגר את התפריט כשבוחרים רשימה
        navigate('/ShoppingListFile', { replace: true });
    };

    useEffect(() => {
        if (selectedFamilyId) {
            getShoppingFamily(selectedFamilyId)
                .then(res => {
                    if (res.data.success) {
                        setShoppingFamily(res.data.data || []);
                        setClose(false); // פותח את התפריט אוטומטית כשבוחרים משפחה
                        
                        let fam = familysApp.find(family => family.familyId === selectedFamilyId);
                        setSelectedFamilyName(fam ? fam.familyName : '');
                    }
                })
                .catch(err => console.log(err));
        } else {
            setSelectedFamilyName('');
            setClose(true);
        }
    }, [selectedFamilyId, user, familysApp]);

    const handleDeleteFamily = async (listId) => {
        try {
            await deleteShoppingFamily(listId);
            setShoppingFamily(prev => prev.filter(shopping => shopping.listId !== listId));
            if (selectedShoppingId === listId) {
                setSelectedShoppingId(null);
            }
        } catch (error) {
            console.error('Error deleting shopping list:', error);
        }
    };

    const handleCreateShoppingFamily = async () => {
        if (!newShoppingFamilyName.trim()) return;

        try {
            const res = await createShoppingFamily(selectedFamilyId, newShoppingFamilyName);
            if (res.data.success) {
                const { ShoppingListId, ShoppingFamilyName } = res.data;
                setShoppingFamily(prev => [...prev, { listId: ShoppingListId, listName: ShoppingFamilyName }]);
                setNewShoppingFamilyName('');
            }
        } catch (error) {
            console.error('Error creating family:', error);
        }
    };

    if (!user) return null;

    return (
        <>
            {!close && selectedFamilyName !== '' && (
                <div className="ShoppingListPage">
                    
                    <AiOutlineClose className="close-icon" onClick={() => setClose(true)} />
                    
                    <div className='familyNameDiv'>
                        <p>{selectedFamilyName}</p>
                    </div>

                    <div className='addFamilyDiv'>
                        <input
                            className='itemInput'
                            value={newShoppingFamilyName}
                            onChange={e => setNewShoppingFamilyName(e.target.value)}
                            placeholder='New list name...'
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateShoppingFamily()}
                        />
                        <div className="addFamily" onClick={handleCreateShoppingFamily}>
                            <BsPlusLg />
                        </div>
                    </div>

                    <div className="lists-container">
                        {shoppingFamily.map((shopping, index) => (
                            <ItemShoppingListPage
                                key={index}
                                shopping={shopping}
                                handleSelectedShoppingId={handleSelectedShoppingId}
                                handleDeleteFamily={handleDeleteFamily}
                                choose={selectedShoppingId === shopping.listId}
                            />
                        ))}
                    </div>

                    <button className="onHandButton" onClick={() => navigate('/onHand')}>
                        <FaBoxOpen /> View On Hand
                    </button>
                </div>
            )}

            {close && selectedFamilyName !== '' && (
                <div className='ShoppingListButton' onClick={() => setClose(false)}>
                    <AiOutlineDoubleLeft />
                    <span>{selectedFamilyName}</span>
                </div>
            )}
        </>
    );
};