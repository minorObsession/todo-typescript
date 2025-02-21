// import { useState } from "react";
import { useEffect, useState } from "react";
import ChecklistItem from "./Checklistitem.tsx";
import Input from "./Input.tsx";
import { Item } from "./types.ts";

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([
    {
      ID: Math.floor(Math.random() * 535353),
      title: "pack bags", // compute based on input
      isFinished: true,
      timestamp: 1740106103073,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "feed cat", // compute based on input
      isFinished: false,
      timestamp: 1740106117946,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "park cars", // compute based on input
      isFinished: false,
      timestamp: 1740106134641,
    },
  ]);

  const toggleItemStatus = (clickedID: number) => {
    const itemInQuestion = items.find((item) => +item.ID === clickedID);

    if (!itemInQuestion) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.ID === itemInQuestion.ID
          ? { ...item, isFinished: !item.isFinished }
          : item
      )
    );
  };

  const addNewItem = () => {
    // ! create item - conform to Item type
    const newItem: Item = {
      ID: Math.floor(Math.random() * 45654),
      timestamp: Date.now(),
      title: newItemTitle,
      isFinished: false,
    };

    // ! IDEA (optional):
    // ENSURE THIS ITEM DOESN'T ALREADY EXIST

    setItems((prevItems) => [...prevItems, newItem]);
    setIsAdding(false);
  };

  const removeItem = (clickedID: number) => {
    const itemInQuestion = items.find((item) => +item.ID === clickedID);

    if (!itemInQuestion) return;

    setItems((prevItems) =>
      prevItems.filter((item) => item.ID !== itemInQuestion.ID)
    );
  };

  // * SYNC WITH CHANGE OF newItemTitle
  useEffect(() => {}, [newItemTitle]);

  // ! add/remove items fns
  // ! add timestamp fn

  return (
    // ! container
    <div className="flex items-center justify-center w-screen h-screen p-20 overflow-hidden">
      {/* // ! left  */}
      <article className="w-full h-full p-10 overflow-hidden text-center bg-amber-200">
        <h1 className="mb-5">To do list</h1>

        {/* // ! search items */}
        <div className="flex items-center justify-around mb-3">
          <h2 className="">Search to do list</h2>
          <Input purpose="search" addNewItem={addNewItem} />
        </div>

        {/* // ! add new item button */}
        <button
          onClick={() => setIsAdding(true)}
          className="px-2 py-1 transition-all duration-300 rounded-sm cursor-pointer hover:scale-110 border-1 border-amber-500 "
        >
          Add new item
        </button>

        {/* // ! items list  */}
        <ul className="flex flex-col gap-3.5 p-8 w-[80%] ">
          {isAdding && (
            <Input purpose="newItem" setNewItemTitle={setNewItemTitle} />
          )}
          {items.map((item) => (
            <ChecklistItem
              // setClickedItem={}
              onChange={() => console.log("Checkbox clicked!")} // Replace with real handler
              key={item.ID}
              item={item}
              isFinished={item.isFinished}
              newItemTitle={newItemTitle}
              toggleItemStatus={toggleItemStatus}
            />
          ))}
        </ul>
      </article>

      {/* // ! right   */}
      <article className="w-full h-full p-10 overflow-hidden text-center bg-amber-700">
        <h1 className="mb-5">Statistics</h1>

        <h2 className="mb-3">% of completed to-do items:</h2>
        {/* // ! progress */}

        <div className="flex items-center justify-center">
          <progress id="file" max="100" value="70" />
          <span className="ml-3 text-center">20%</span>
        </div>
      </article>
    </div>
  );
}

export default App;
