import React from 'react';
import ItemShoppingList from "./ItemShoppingList";

export default function GroupedItems({ groupedItems, deleteItem, updateItem }) {
  const renderedGroups = [];

  for (const department in groupedItems) {
    const itemsInDept = groupedItems[department];
    const itemComponents = [];

    for (let i = 0; i < itemsInDept.length; i++) {
      const item = itemsInDept[i];

      itemComponents.push(
        <ItemShoppingList
          key={item.itemId}
          item={item}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      );
    }

    renderedGroups.push(
      <div key={department} className="department-group">
        {itemComponents}
      </div>
    );
  }

  return <>{renderedGroups}</>;
}
