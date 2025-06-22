import React, { useState, useEffect } from 'react';
import '../style/Requests.css'


export default  function Requests({items} ) {
const [approvedNanItems, setApprovedNanItems] = useState(items.filter(item => item.approved === 0));
 useEffect(() => {
    setApprovedNanItems(items.filter(item => item.approved === 0));
  }, [items]);

    return (<div> 
{approvedNanItems.map(NanItem => (<div className='requestsItem'>
  {  NanItem.itemName}
</div>))}
    </div> );
};