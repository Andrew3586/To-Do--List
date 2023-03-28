import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ToDoEdit = () => {
  const [aToDoInput, setaToDoInput] = useState("");
  const [category, setCategory] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [marktodo, setMarktodo] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9292/todos", requestOptions)
      .then((response) => response.json())
      .then((data) => setTodolist(data.todos));
  }, []);
  const aToDoInputHandler = (event) => {
    setaToDoInput(event.target.value);
  };
  const checktodotHandler = (itemId, marked) => {
    // marktodo[itemId]=!marked
    // setMarktodo(marktodo);
    // console.log(marktodo);
    let tempTodo = []
    todolist.map((item) => {

      if (itemId === item.id) {
        item.marked=!marked

      }
      tempTodo.push(item)
    }
    );
    console.log(tempTodo)
    setTodolist(tempTodo)
  console.log(todolist);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "marked": !marked }),
    };
    try {
      fetch("http://localhost:9292/todos/" + itemId, requestOptions)
        .then((r) => r.json())
        .then((data) => console.log(data));
      console.log(aToDoInput);
    } catch (error) {
      console.log(error);
    }
  };
  const removeElement = (itemId) => {
    console.log(itemId);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      fetch("http://localhost:9292/todos/" + itemId, requestOptions)
        .then((r) => r.json())
        .then((data) => console.log(data));
      console.log(aToDoInput);
    } catch (error) {
      console.log(error);
    }
  };
  const listingtodos = todolist
    ? todolist.map((item) => (
        <tr className="border-b-[#323754] border-b-2">
          <td>
            <label>
              <input type="checkbox"id={item.id} onChange={() => checktodotHandler(item.id, item.marked)} checked={item.marked} />
              <span>{item.name}</span>
            </label>
          </td>
          <td className="flex justify-end gap-6">
            <button>
              <FiEdit3 />
            </button>
            <button onClick={() => removeElement(item.id)} className="mr-2">
              <MdOutlineDeleteOutline />
            </button>
          </td>
        </tr>
      ))
    : "";

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(todolist);
    console.log(listingtodos);
    const data = { task: aToDoInput, category: category };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: aToDoInput, category_name: category }),
    };
    try {
      fetch("http://localhost:9292/todos", requestOptions)
        .then((r) => r.json())
        .then((data) => console.log(data));
      console.log(aToDoInput);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-sky-500/[.40]  flex flex-col h-screen items-center justify-center gap-10">
      <h1 className="text-4xl font-bold m-4">Add To Do Task</h1>
      <form
        className="flex flex-col gap-6 w-full max-w-sm"
        onSubmit={formSubmitHandler}
      >
        <input
          type="text"
          name="category"
          id="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={category}
          placeholder="Enter a category"
        />
        <input
          type="text"
          required
          placeholder="Task To Be Done"
          onChange={aToDoInputHandler}
          value={aToDoInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          className="flex-shrink-0 bg-[#243e8e] hover:bg-[#323754] border-[#243e8e] hover:border-[#323754] text-sm border-4 text-white py-1 px-2 rounded duration-300"
          type="submit"
          id="submit"
          value="Add Task"
        />
      </form>

      <div class="relative overflow-x-auto w-full max-w-sm p-1 border-2 border-[#000080] rounded-lg">
        <table className="w-full max-w-sm ">{listingtodos}</table>
      </div>
    </div>
  );
};

export default ToDoEdit;
