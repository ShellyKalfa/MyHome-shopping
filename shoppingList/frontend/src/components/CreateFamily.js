import React, { useEffect, useState } from 'react';
import ItemFamily from './ItemFamily';

import { BsJournalPlus } from "react-icons/bs";
import "../style/CreateFamily.css"


export default  function CreateFamily() {
    const [familys,setFamilys]=useState(["shelly","work" ])

    return ( <div className="familyManagementBord">
        <div className="Bord">
            <div className='bordMarge'>
                    <h1>family</h1>
                    <div className="addFamily" >
                            <div> create family </div>
                            <BsJournalPlus />
                        </div>
                    <div className="familys">
                         {
                            familys.map((family, index) => (
                                <ItemFamily key={index} family={family} /> ))
                         }
                    </div>
            </div>
        </div>
        <div className="Bord">
           <h1>members</h1> 
        </div>
 
    </div> );
};