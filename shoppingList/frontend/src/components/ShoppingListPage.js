import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styles
import '../style/ShoppingListPage.css';
import { BsJournalPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";


export default function ShoppingListPage({ selectedFamilyId, setSelectedShoppingId }) {
    const [shoppingFamily, setShoppingFamily] = useState([])
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
                            setClose(true)
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [selectedFamilyId]);

    return (<div className={`ShoppingListPage ${!close ? 'Block' : 'none'}`}>
        <AiOutlineClose onClick={() => setClose(true)} />
        <div className='addFamilyDiv'>
            <input
                className='itemInput'
                // value={newMemberEmail}
                // onChange={e => setNewMemberEmail(e.target.value)}
                placeholder='Enter shopping list name...'
            />
            <div className="addFamily"
            //onClick={handleAddFamilyMember}
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