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
      title: "pack bags",
      isFinished: true,
      createdAt: 1740106103073,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "feed dog",
      isFinished: false,
      createdAt: 1740106117946,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "feed cat",
      isFinished: false,
      createdAt: 1740106145965,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "feed turtle",
      isFinished: false,
      createdAt: 1740106199885,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "do homework",
      isFinished: false,
      createdAt: 1740106155446,
    },
    {
      ID: Math.floor(Math.random() * 535353),
      title: "park cars",
      isFinished: false,
      createdAt: 1740106177445,
    },
  ]);

  const itemsSortedByStatus = items.sort(
    (a, b) => +a.isFinished - +b.isFinished
  );

  const percentageOfCompletedItems = Math.ceil(
    (items.filter((item) => item.isFinished).length / items.length) * 100
  );

  const toggleItemStatus = (clickedID: number) => {
    const itemInQuestion = items.find((item) => +item.ID === clickedID);

    if (!itemInQuestion) return;

    const completedAt = Date.now();

    // ! I WAS HERE
    const completedIn =
      new Date(completedAt) - new Date(itemInQuestion.createdAt);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.ID === itemInQuestion.ID
          ? {
              ...item,
              isFinished: !item.isFinished,
              completedAt: completedAt,
              completedIn: completedIn,
            }
          : item
      )
    );
  };

  const addNewItem = () => {
    // ! create item - conform to Item type
    const newItem: Item = {
      ID: Math.floor(Math.random() * 45654),
      createdAt: Date.now(),
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

  return (
    // ! container
    <div className="flex items-center justify-center w-screen h-screen p-20 overflow-hidden">
      {/* // ! left  */}
      <article className="flex flex-col w-full h-full p-10 overflow-hidden text-center rounded-md bg-amber-200">
        <h1 className="mb-5">To do list</h1>

        {/* // ! search items */}
        <div className="flex items-center justify-around mb-3">
          <h2 className="">Search to do list</h2>
          <Input purpose="search" addNewItem={addNewItem} />
        </div>

        {/* // ! add new item button */}
        <button
          onClick={() => setIsAdding(true)}
          className="mb-5 self-center w-[70%] px-2 py-1 transition-all duration-300 rounded-sm cursor-pointer hover:scale-105 border-1 border-amber-500 "
        >
          Add new item
        </button>

        {/* // ! items list  */}
        <ul className="flex flex-col gap-3.5 p-10 w-full overflow-y-auto mx-auto ">
          {isAdding && (
            <Input purpose="newItem" setNewItemTitle={setNewItemTitle} />
          )}
          {itemsSortedByStatus.map((item) => (
            <ChecklistItem
              // setClickedItem={}
              onChange={() => console.log("Checkbox clicked!")} // Replace with real handler
              key={item.ID}
              item={item}
              isFinished={item.isFinished}
              newItemTitle={newItemTitle}
              toggleItemStatus={toggleItemStatus}
              removeItem={removeItem}
            />
          ))}
        </ul>
      </article>

      {/* // ! right   */}
      <article className="flex flex-col w-full h-full p-10 overflow-hidden text-center rounded-md bg-amber-700">
        <h1 className="mb-5">Statistics</h1>

        {/* // ! progress */}
        <h2 className="mb-3">% of completed to-do items:</h2>
        <div className="flex items-center justify-center">
          <progress id="file" max="100" value={percentageOfCompletedItems} />
          <p className="ml-3 text-center">{percentageOfCompletedItems}%</p>
        </div>

        {/* // ! 3 fastest items  */}
        <div className="mt-5">
          <p>Fastest completed items:</p>
          {/* // * 3 fastest */}
        </div>

        {/* // ! bottom stats div */}
        <div className="self-start mt-auto ">
          <p>Total # of items: {items.length}</p>
        </div>
      </article>
    </div>
  );
}

export default App;
