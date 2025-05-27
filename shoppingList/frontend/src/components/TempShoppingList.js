import React, { useState, useEffect } from 'react';
import ItemShoppingList from "./ItemShoppingList";
import '../style/TempShoppingList.css'
import Typing from './Typing';


export default function TempShoppingList({ items,isTemp }) {


    return (
        <div className='board'>
            <div className='flex'>
                <h2 className='textCenter'> {isTemp ? <Typing text={['רשימת קניות ','כדורגל עם חברים','ערב תה עם הבנות','ערב זוגי בבית']}/> :' רשימת קניות '}</h2>
                <div className='board-items '>
                    {items.map((item, index) => (
                        <ItemShoppingList key={index} item={item} />
                    ))}
                </div>
            </div>
            <button className='bigButton'> Send To Wolt </button>
        </div>
    );
}
