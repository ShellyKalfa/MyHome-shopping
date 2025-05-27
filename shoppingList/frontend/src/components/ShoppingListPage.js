import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styles
import '../style/ShoppingListPage.css';
import { BsJournalPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

// API
import {
   createShoppingList
} from '../api/family';


export default function ShoppingListPage({ selectedFamilyId, setSelectedShoppingId }) {
    const [shoppingFamily, setShoppingFamily] = useState([])
    const [newShoppingFamily, setNewShoppingFamily] = useState('')
    const [close, setClose] = useState(true)
    const navigate = useNavigate();
    const handleSelectedShoppingId = (ShoppingId) => {
        setSelectedShoppingId(ShoppingId)
        navigate('/ShoppingListFile', { replace: true });

    }

    useEffect(() => {
        console.log("shoppingFamily", shoppingFamily);

    }, [shoppingFamily]);

    useEffect(() => {
        console.log("user", selectedFamilyId);

        if (selectedFamilyId) {
            axios.post(`http://localhost:5000/Shopping/shoppingFamily/${selectedFamilyId}`, {})
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        console.log(res.data.data)
                        if (res.data.data != null) {
                            setShoppingFamily(res.data.data)
                            setClose(false)
                        } else {
                            setShoppingFamily([])
                            setClose(false)
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [selectedFamilyId]);

    const handleCreateFamily = async () => {
        if (!newShoppingFamily.trim()) return;

        try {
            const res = await createShoppingList(selectedFamilyId, newShoppingFamily);
            if (res.data.success) {
                console.log(res.data);
                
                const { listId, listName } = res.data.data;
                setShoppingFamily(prev => [...prev, { listId, listName }]);
                setNewShoppingFamily('');
            }
        } catch (error) {
            console.error('Error creating family:', error);
        }
    };



    return (<div className={`ShoppingListPage ${!close ? 'Block' : 'none'}`}>
        <AiOutlineClose onClick={() => setClose(true)} />
            <h3 className='textCenter'>צור רשימת קניות למשפחה</h3>
        <div className='addFamilyDiv'>
            <input
                className='itemInput'
                value={newShoppingFamily}
                onChange={e => setNewShoppingFamily(e.target.value)}
                placeholder='Enter shopping list name...'
            />
            <div className="addFamily"
                onClick={handleCreateFamily}
            >
                <div>Add shopping list</div>
                <BsJournalPlus />
            </div>
        </div>

        {!close ? (
            <div>
                {shoppingFamily.map((shopping, index) => (
                    <div className='ItemFamily' key={index} listName={shopping} on onClick={() => handleSelectedShoppingId(shopping.listId)} > {shopping.listName}</div>
                ))}
            </div>
        ) : (
            <div></div>
        )
        }

    </div>);


};