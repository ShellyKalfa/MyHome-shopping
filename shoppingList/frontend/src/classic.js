import React, { useState } from "react";

const classic = () => {
  const [items, setItesms] = useState([
    { category: "Produce", name: "Apples", selected: true },
    { category: "Produce", name: "Bananas", selected: true },
    { category: "Produce", name: "Carrots", selected: false },
    { category: "Dairy", name: "Milk", selected: true },
    { category: "Dairy", name: "Cheese", selected: false },
    { category: "Beverages", name: "Coffee", selected: false },
  ]);

  const toggleItem = (index) => {
    const updated = [...items];
    updated[index].selected = !updated[index].selected;
    setItesms(updated);
  };

  const sendToWolt = () => {
    const selectedItems = items.filter((item) => item.selected);
    console.log("Sending to Wolt:", selectedItems);
    // Add API logic to send to Wolt and then update on-hand inventory
  };

  const groupedItems = items.reduce((groups, item, index) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push({ ...item, index });
    return groups;
  }, {});

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Organize your family’s shopping list
      </h1>
      <p className="text-lg text-center text-gray-600">
        Create a shared grocery list and send it to Wolt when you’re done.
      </p>
     

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Shopping List</h2>
        {Object.keys(groupedItems).map((category) => (
          <div key={category} className="mb-4">
            <h3 className="font-semibold text-lg mb-1">{category}</h3>
            {groupedItems[category].map((item) => (
              <div
                key={item.name}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toggleItem(item.index)}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    item.selected ? "bg-green-500 border-green-500" : "border-gray-400"
                  }`}
                >
                  {item.selected && <span className="text-white">✓</span>}
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default classic;
