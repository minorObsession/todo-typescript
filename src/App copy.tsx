// import { useState } from "react";

function App() {
  return (
    // ! container
    <div className="flex items-center justify-center w-screen h-screen p-20 overflow-hidden">
      {/* // ! left  */}
      <article className="w-full h-full p-10 overflow-hidden text-center bg-amber-200">
        <h1>To do list</h1>
        {/* // ! add new item container */}
        <div className="flex items-center justify-center gap-5 ">
          <p>Add new item</p>
          <button>Add</button>
        </div>
        {/* // ! items list  */}
        <ul className="flex flex-col gap-3.5 my-20 mx-8">
          {/* // * extract into separate component */}
          <li className="flex items-center justify-start gap-4">
            <input type="checkbox" />
            <span>example item text</span>
          </li>
          {/* // * extract into separate component */}
          <li className="flex items-center justify-start gap-4">
            <input type="checkbox" />
            <span>example item text</span>
          </li>
          {/* // * extract into separate component */}
          <li className="flex items-center justify-start gap-4">
            <input type="checkbox" />
            <span>example item text</span>
          </li>
          {/* // * extract into separate component */}
          <li className="flex items-center justify-start gap-4">
            <input type="checkbox" />
            <span>example item text</span>
          </li>
          {/* // * extract into separate component */}
          <li className="flex items-center justify-start gap-4">
            <input type="checkbox" />
            <span>example item text</span>
          </li>
          {/* // * extract into separate component */}
          <li className="flex items-center justify-start gap-4">
            <input type="checkbox" />
            <span>example item text</span>
          </li>
        </ul>
      </article>
      {/* // ! right   */}
      <article className="w-full h-full p-10 overflow-hidden text-center bg-amber-700">
        <h1>Statistics</h1>
      </article>
    </div>
  );
}

export default App;
