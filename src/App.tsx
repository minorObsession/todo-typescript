import { useEffect, useRef, useState } from "react";
import ChecklistItem from "./Checklistitem.tsx";
import Input from "./Input.tsx";
import { Item, Items } from "./types.ts";
import { flexibleMillisecondsConverter } from "./flexibleMillisecondsConverter.ts";
import { useInputChangeDebounce } from "./useInputChangeDebounce(useState+useEffect).tsx";

function App() {
  const [items, setItems] = useState<Items>([
    {
      ID: crypto.randomUUID(),
      title: "pack lunch",
      isFinished: false,
      createdAt: 1740148805000, // 20 min 5 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "feed dog",
      isFinished: false,
      createdAt: 1740141623000, // 2 hours 12 min 37 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "feed cat",
      isFinished: false,
      createdAt: 1740112809000, // 12 hours 39 min 51 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "feed mouse",
      isFinished: false,
      createdAt: 1740096017000, // Yesterday (1 day 1 hour 46 min 43 sec ago)
    },
    {
      ID: crypto.randomUUID(),
      title: "do homework",
      isFinished: false,
      createdAt: 1739923228000, // 3 days 4 hours 27 min 32 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "park bikes",
      isFinished: false,
      createdAt: 1739515214000, // 1 week 2 hours 39 min 46 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "pack bags",
      isFinished: false,
      createdAt: 1740148805000, // 20 min 5 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "feed snake",
      isFinished: false,
      createdAt: 1740141623000, // 2 hours 12 min 37 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "feed leopard",
      isFinished: false,
      createdAt: 1740112809000, // 12 hours 39 min 51 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "feed turtle",
      isFinished: false,
      createdAt: 1740096017000, // Yesterday (1 day 1 hour 46 min 43 sec ago)
    },
    {
      ID: crypto.randomUUID(),
      title: "do homework",
      isFinished: false,
      createdAt: 1739923228000, // 3 days 4 hours 27 min 32 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "park cars",
      isFinished: false,
      createdAt: 1739515214000, // 1 week 2 hours 39 min 46 sec ago
    },
    {
      ID: crypto.randomUUID(),
      title: "walk the dog",
      isFinished: false,
      createdAt: 1740144000000, // 30 min ago
    },
    {
      ID: crypto.randomUUID(),
      title: "clean kitchen",
      isFinished: false,
      createdAt: 1740137232000, // 45 min ago
    },
    {
      ID: crypto.randomUUID(),
      title: "write email",
      isFinished: false,
      createdAt: 1740130000000, // 1 hour 15 min ago
    },
    {
      ID: crypto.randomUUID(),
      title: "check email",
      isFinished: false,
      createdAt: 1740123456000, // 2 hours ago
    },
    {
      ID: crypto.randomUUID(),
      title: "take break",
      isFinished: false,
      createdAt: 1740119894000, // 2 hours 20 min ago
    },
    {
      ID: crypto.randomUUID(),
      title: "prepare dinner",
      isFinished: false,
      createdAt: 1740108811000, // 4 hours ago
    },
    {
      ID: crypto.randomUUID(),
      title: "go shopping",
      isFinished: false,
      createdAt: 1740101315000, // 5 hours ago
    },
    {
      ID: crypto.randomUUID(),
      title: "read a book",
      isFinished: false,
      createdAt: 1740093620000, // Yesterday 3 hours ago
    },
    {
      ID: crypto.randomUUID(),
      title: "study",
      isFinished: false,
      createdAt: 1739905125000, // 3 days 12 hours ago
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Items>([]);
  const query = useInputChangeDebounce(searchQuery);

  const newItemInputRef = useRef<HTMLInputElement | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalNumPages = Math.ceil(items.length / itemsPerPage);

  const itemsSortedByStatus =
    filteredItems.length > 0
      ? filteredItems.sort((a, b) => +a.isFinished - +b.isFinished)
      : items.sort((a, b) => +a.isFinished - +b.isFinished);

  const threeFastestItems = items
    .filter((item) => typeof item.completedInMs === "number")
    .filter((item) => item.isFinished)
    .sort(
      (a, b) => (a.completedInMs ?? Infinity) - (b.completedInMs ?? Infinity)
    )
    .slice(0, 3);

  const percentageOfCompletedItems = Math.ceil(
    (items.filter((item) => item.isFinished).length / items.length) * 100
  );

  useEffect(() => {
    if (!isAdding) return;
    newItemInputRef.current?.focus();
  }, [isAdding]);

  useEffect(() => {
    if (!query || query.length === 0) {
      setFilteredItems([]);
    } else {
      setFilteredItems(items.filter((item) => item.title.includes(query)));
    }
  }, [query, items]);

  const toggleItemStatus = (clickedID: string) => {
    const itemInQuestion = items.find((item) => item.ID === clickedID);

    if (!itemInQuestion) return;

    const completedAt = Date.now();

    const completedInMs = completedAt - itemInQuestion.createdAt;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.ID === itemInQuestion.ID
          ? {
              ...item,
              isFinished: !item.isFinished,
              completedAt: completedAt,
              completedInMs: completedInMs,
              completedIn: flexibleMillisecondsConverter(completedInMs),
            }
          : item
      )
    );
  };

  const addNewItem = () => {
    // if ()
    // ! create item - conform to Item type
    const newItem: Item = {
      ID: crypto.randomUUID(),
      createdAt: Date.now(),
      title: newItemTitle,
      isFinished: false,
    };

    const isDuplicate = items.find((item) => item.title === newItem.title);
    if (isDuplicate) {
      setIsAdding(false);
      alert("this item already exists!");
      return;
    }

    setItems((prevItems) => [newItem, ...prevItems]);
    setIsAdding(false);
  };

  const removeItem = (clickedID: string) => {
    const itemInQuestion = items.find((item) => item.ID === clickedID);

    if (!itemInQuestion) return;

    setItems((prevItems) =>
      prevItems.filter((item) => item.ID !== itemInQuestion.ID)
    );
  };

  const prevPage = () => {
    if (currentPage >= 1) setCurrentPage((prevState) => --prevState);
  };
  const nextPage = () => {
    if (currentPage <= totalNumPages)
      setCurrentPage((prevState) => ++prevState);
  };

  return (
    // ! container
    <div className="flex items-center justify-center w-screen h-screen p-20 overflow-hidden">
      {/* // ! left  */}
      <article className="flex flex-col w-full h-full p-10 overflow-hidden text-center rounded-md bg-amber-200">
        <h1 className="mb-5">To do list</h1>

        {/* // ! search items */}
        <div className="flex items-center justify-around mb-3">
          <h2 className="">Search to do list</h2>
          <Input
            purpose="search"
            addNewItem={addNewItem}
            setSearchQuery={setSearchQuery}
            setIsAdding={setIsAdding}
          />
        </div>

        {/* // ! add new item button */}
        <button
          onClick={() => setIsAdding(true)}
          className=" self-center w-[70%] px-2 py-1 transition-all duration-300 rounded-sm cursor-pointer hover:scale-105 border-1 border-amber-500 "
        >
          Add new item
        </button>

        {/* // ! items list  */}
        <ul className="flex flex-col gap-3.5 p-10 w-full overflow-y-auto mx-auto ">
          {isAdding && (
            <Input
              purpose="newItem"
              setNewItemTitle={setNewItemTitle}
              ref={newItemInputRef}
            />
          )}
          {itemsSortedByStatus
            .slice(
              (currentPage - 1) * itemsPerPage,
              (currentPage - 1) * itemsPerPage + 5
            )
            .map((item, i) => (
              <ChecklistItem
                onChange={() => {}}
                key={item.ID}
                item={item}
                isFinished={item.isFinished}
                newItemTitle={newItemTitle}
                toggleItemStatus={toggleItemStatus}
                removeItem={removeItem}
              />
            ))}
        </ul>

        {/* // ! pagination */}
        <div className="flex items-center justify-center gap-2 mt-auto justify-self-end ">
          <button className="cursor-pointer" onClick={prevPage}>
            ←
          </button>
          <span>
            Page {currentPage} of {totalNumPages}
          </span>
          <button className="cursor-pointer" onClick={nextPage}>
            →
          </button>
        </div>
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
        {percentageOfCompletedItems === 100 && (
          <p className="mt-3">Completed all tasks! 🥳 🥳 🥳</p>
        )}

        {/* // ! 3 fastest items  */}
        {threeFastestItems.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-5">
            <h2 className="mb-3">Fastest completed items:</h2>
            {threeFastestItems.map((item, i) => (
              <div
                key={item.ID}
                className="flex items-center justify-center gap-2"
              >
                <h3>
                  {i + 1}: {item.title} →{" "}
                  {flexibleMillisecondsConverter(item.completedInMs ?? 0)}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* // ! bottom stats div */}
        <div className="self-start mt-auto ">
          <p>Total # of items: {items.length}</p>
        </div>
      </article>
    </div>
  );
}

export default App;
