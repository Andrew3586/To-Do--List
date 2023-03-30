import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const ToDoEdit = () => {
  const [aToDoInput, setaToDoInput] = useState("");
  const [category, setCategory] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [marktodo, setMarktodo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9292/todos/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => setToDoData(data));
  }, []);

  const setToDoData = (todos) => {
    setTodolist([todos.todos])
    setaToDoInput(todos.todos.name);
    setCategory(todos.category.name);
  };

  const aToDoInputHandler = (event) => {
    setaToDoInput(event.target.value);
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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(todolist);
    const data = { task: aToDoInput, category: category };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: aToDoInput, category_name: category }),
    };
    try {
      fetch("http://localhost:9292/todos/" + id, requestOptions)
        .then((r) => r.json())
        .then((data) => console.log(data));
      console.log(aToDoInput);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-sky-500/[.40]  flex flex-col h-screen items-center justify-center gap-10">
      <h1 className="text-4xl font-bold m-4">Edit Category And Task</h1>
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
          placeholder="Edit Category"
        />
        <input
          type="text"
          required
          placeholder="Edit Task"
          onChange={aToDoInputHandler}
          value={aToDoInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          className="flex-shrink-0 bg-[#243e8e] hover:bg-[#323754] border-[#243e8e] hover:border-[#323754] text-sm border-4 text-white py-1 px-2 rounded duration-300"
          type="submit"
          id="submit"
          value="Update Task and Category"
        />
      </form>
    </div>
  );
};

export default ToDoEdit;
