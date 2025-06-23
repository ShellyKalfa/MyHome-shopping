import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API
import {
    createShoppingFamily,
    getShoppingFamily

} from '../api/shopping';

// Components
import ItemShoppingListPage from './ItemShoppingListPage';

// Styles
import '../style/ShoppingListPage.css';
import { BsJournalPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

// API
import {
    createShoppingList
} from '../api/family';


export default function ShoppingListPage({ user, familysApp, selectedFamilyId, selectedShoppingId, setSelectedShoppingId }) {
    const [shoppingFamily, setShoppingFamily] = useState([])
    const [newShoppingFamilyName, setNewShoppingFamilyName] = useState('')
    const [close, setClose] = useState(true)
    const selectedFamily = familysApp.find(family => family.familyId === selectedFamilyId);
    const [selectedFamilyName, setSelectedFamilyName] = useState(selectedFamily ? selectedFamily.familyName : '')
    const navigate = useNavigate();
    const handleSelectedShoppingId = (ShoppingId) => {
        setSelectedShoppingId(ShoppingId)
        setClose(true)
        navigate('/ShoppingListFile', { replace: true });

    }

    useEffect(() => {
        if (selectedFamilyId) {

            getShoppingFamily(selectedFamilyId)
                .then(res => {
                    console.log(res.data);
                    if (res.data.success) {
                        if (res.data.data != null) {
                            setShoppingFamily(res.data.data);
                            setClose(false);
                        } else {
                            setShoppingFamily([]);
                            setClose(false);
                        }
                        let selectedFamily = familysApp.find(family => family.familyId === selectedFamilyId);
                        setSelectedFamilyName(selectedFamily ? selectedFamily.familyName : '')
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            setSelectedFamilyName('');
            setClose(true);
        }
    }, [selectedFamilyId, user]);


    const handleCreateShoppingFamily = async () => {
        if (!newShoppingFamilyName.trim()) return;

        try {
            const res = await createShoppingFamily(selectedFamilyId, newShoppingFamilyName);
            console.log(res.data)
            if (res.data.success) {
                const { ShoppingListId, ShoppingFamilyName } = res.data;
                setShoppingFamily(prev => [...prev, { listId: ShoppingListId, listName: ShoppingFamilyName }]);
                setNewShoppingFamilyName('');
            }
        } catch (error) {
            console.error('Error creating family:', error);
        }
    };



    return (
        <div className={user && (!close || selectedFamilyName !== '') ? 'Block' : 'none'}>
            {!close ?
                <div className={`ShoppingListPage ${!close && user ? 'Block' : 'none'}`}>
                    <AiOutlineClose onClick={() => setClose(true)} />
                    <div className='familyNameDiv' >  <p>{selectedFamilyName}</p></div>
                    <div className='addFamilyDiv textBox'>
                        <input
                            className='itemInput'
                            value={newShoppingFamilyName}
                            onChange={e => setNewShoppingFamilyName(e.target.value)}
                            placeholder='Enter shopping list name...'
                        />
                        <div className="addFamily"
                            onClick={handleCreateShoppingFamily}>
                            <div>Add shopping list</div>
                            <BsJournalPlus />
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
                :
                <div className={selectedFamilyName !== '' ? 'Block' : 'none'}>
                    <div className='ShoppingListButton' onClick={() => setClose(false)} >
                        {'<<   '}{selectedFamilyName}
                    </div>
                </div>
            }
        </div>
    );
};