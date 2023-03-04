import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md"
const ToDoInput = () => {
  const [aToDoInput, setaToDoInput] = useState("");

  const aToDoInputHandler = (event) => {
    console.log(event.target.value);
    setaToDoInput(event.target.value);
  };

  const formSubmitHandler = (event) => {
    try {
      event.preventDefault();
      console.log(aToDoInput);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-sky-500/[.40]  flex flex-col h-screen items-center justify-center gap-10">
      <h1 className="text-4xl font-bold m-4">To Do</h1>
      <form
        className="w-full max-w-sm flex items-center border-b border-[#243e8e] py-2"
        onSubmit={formSubmitHandler}
      >
        <input
          type="text"
          required
          placeholder="Task To Be Done"
          onChange={aToDoInputHandler}
          value={aToDoInput}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <input
          className="flex-shrink-0 bg-[#243e8e] hover:bg-[#323754] border-[#243e8e] hover:border-[#323754] text-sm border-4 text-white py-1 px-2 rounded duration-300"
          type="submit"
          id="submit"
          value="Add"
        />
      </form>
      <div className="flex w-full max-w-sm justify-between border-3 p-2 rounded-md border-2 border-[#000080]">
        <label className="flex gap-2">
          <input type="checkbox" />
          <span>My Value</span>
        </label>
        <div className="flex gap-2">
          <button>
            <FiEdit3 />
          </button>
          <button><MdOutlineDeleteOutline/></button>
        </div>
      </div>
    </div>
  );
};

export default ToDoInput;
