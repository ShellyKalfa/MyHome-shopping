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
import {
    getShoppingFamily,
    createShoppingFamily
} from '../api/shopping';

// componnet of the side menu that hold the shopping listts 
export default function ShoppingListPage({ user, familysApp, selectedFamilyId, selectedShoppingId, setSelectedShoppingId, setListName }) {
    const [shoppingFamily, setShoppingFamily] = useState([])
    const [newShoppingFamilyName, setNewShoppingFamilyName] = useState('')
    const [close, setClose] = useState(true)
    const selectedFamily = familysApp.find(family => family.familyId === selectedFamilyId);
    const [selectedFamilyName, setSelectedFamilyName] = useState(selectedFamily ? selectedFamily.familyName : '');
    
    const navigate = useNavigate();

    //  Selected Shopping list to update 
    const handleSelectedShoppingId = (ShoppingId, ShoppingName) => {
        setSelectedShoppingId(ShoppingId)
        setListName(ShoppingName)
        setClose(true)
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

    //CreateShopping list by the Family id 
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

                    {!close ? (
                        <div>
                            {shoppingFamily.map((shopping, index) => (
                                < ItemShoppingListPage key={index}
                                    shopping={shopping}
                                    handleSelectedShoppingId={handleSelectedShoppingId}
                                    choose={selectedShoppingId === shopping.listId} />

                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )
                    }
                    <button className="onHandButton" onClick={() => {
                        navigate('/onHand'); setClose(true);
                    }}>
                        View On Hand Item
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