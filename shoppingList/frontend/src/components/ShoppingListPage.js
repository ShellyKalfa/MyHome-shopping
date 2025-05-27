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


export default function ShoppingListPage({ user,selectedFamilyId,selectedShoppingId ,setSelectedShoppingId }) {
    const [shoppingFamily, setShoppingFamily] = useState([])
    const [newShoppingFamilyName, setNewShoppingFamilyName] = useState('')
    const [close, setClose] = useState(true)
    const navigate = useNavigate();
    const handleSelectedShoppingId = (ShoppingId) => {
        setSelectedShoppingId(ShoppingId)
        navigate('/ShoppingListFile', { replace: true });

    }
 useEffect(() => {},[user])
    useEffect(() => {
        console.log("user", selectedFamilyId);
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
                  }
              })
              .catch(err => {
                  console.log(err);
              });
        }
    }, [selectedFamilyId]);


    const handleCreateShoppingFamily = async () => {
        if (!newShoppingFamilyName.trim()) return;

        try {
            const res = await createShoppingFamily(selectedFamilyId, newShoppingFamilyName);
            console.log(res.data)
            if (res.data.success) {
                const { ShoppingListId, ShoppingFamilyName } = res.data;
                setShoppingFamily(prev => [...prev, { listId:ShoppingListId, listName:ShoppingFamilyName }]);
                setNewShoppingFamilyName('');
            }
        } catch (error) {
            console.error('Error creating family:', error);
        }
    };



    return (<div className={`ShoppingListPage ${!close && user ? 'Block' : 'none'}`}>
        <AiOutlineClose onClick={() => setClose(true)} />
        <div className='addFamilyDiv textBox'>
            <input
                className='itemInput'
                value={newShoppingFamilyName}
                onChange={e => setNewShoppingFamilyName(e.target.value)}
                placeholder='Enter shopping list name...'
            />
            <div className="addFamily"
            onClick={handleCreateShoppingFamily}
            >
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

    </div>);


};