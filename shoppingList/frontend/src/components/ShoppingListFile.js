import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ShoppingList from "./ShoppingList";


export default function ShoppingListFile({ user, selectedShoppingId, listName }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.userId) {
            navigate('/', { replace: true });
            return;
        }
    }, [user]);

    return (
        <div>
            <ShoppingList isTemp={false}
                          selectedShoppingId={selectedShoppingId}
                          listName={listName}
                          user={user} />
        </div>
    )
};