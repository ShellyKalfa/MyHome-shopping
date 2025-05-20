import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ShoppingList from "./ShoppingList";


export default function ShoppingListFile({User,selectedShoppingId}) {
    const navigate = useNavigate();
    useEffect(() => {
            if (!User?.userId) {
                navigate('/', { replace: true });
                return;
            }
        }, [User]);

    return (
        <div>
            <ShoppingList isTemp={false} selectedShoppingId={selectedShoppingId}/>
        </div>
    )
};