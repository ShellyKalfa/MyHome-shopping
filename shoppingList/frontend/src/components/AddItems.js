

function AddItem() {
    return (
    <div className="box">
        < div className="addItemTitle">add item</div>
         <div className="topButton">
                <input className="itemInput" placeholder="Item name..."/> 
                <input className="itemAmount" placeholder=" amount of items... "/>
        </div>
        <div className="topButton">
               <select  className="selectInput">
                        <option value="" disabled selected hidden>Choose category...</option>
                        <option>Dairy</option>
                        <option>bakery</option>
                        <option>meat</option>
                        <option>vegetables</option>
                </select>
                <button className="buttonAddItems"> save  </button>
               
                <button className="buttonAddItems"> cancel  </button>
        </div>
      
    </div>);
}

export default AddItem;