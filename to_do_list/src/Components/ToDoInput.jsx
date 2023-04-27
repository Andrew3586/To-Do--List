import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../Constant/Constant";
import { nanoid } from "nanoid";
import ToDoList from "./ToDoList";
import DataContext from "../Context/dataContext";

const ToDoInput = () => {
  const { categoryData, fetchCategories } = useContext(DataContext);

  const [category, setCategory] = useState("");
  const categoryHandler = async (event) => {
    try {
      event.preventDefault();
      const saveCategory = await axios.post(`${BASE_URL}categories`, {
        category_name: category,
      });
      if (saveCategory.status === 200) {
        alert(saveCategory.data.message);
        setCategory("");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [selectedCatValue, setSelectedCatValue] = useState("default");
  const [taskAdded, setTaskAdded] = useState("");

  const taskHandler = async (e) => {
    try {
      e.preventDefault();
      if (selectedCatValue === "default") {
        return alert("Category is required!");
      }
      const res = await axios.post(
        `${BASE_URL}categories/${selectedCatValue}/todos`,
        { name: taskAdded }
      );
      if (res.status === 200) {
        alert(res.data.message);
        setTaskAdded("");
        setSelectedCatValue("default");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-sky-500/[.40]  flex flex-col h-screen items-center justify-center gap-10">
      <h1 className="text-4xl font-bold m-4">Add A New Category</h1>
      <form
        className="flex flex-col gap-6 w-full max-w-sm"
        onSubmit={categoryHandler}
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
          placeholder="Enter a new category"
        />
        <input
          className="flex-shrink-0 bg-[#243e8e] hover:bg-[#323754] border-[#243e8e] hover:border-[#323754] text-sm border-4 text-white py-1 px-2 rounded duration-300"
          type="submit"
          id="submit"
          value="Add New Category"
        />
      </form>

      <h1 className="text-4xl font-bold m-4">Add A New Task</h1>
      <form
        className="flex flex-col gap-6 w-full max-w-sm"
        onSubmit={taskHandler}
      >
        <select
          id="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedCatValue(e.target.value);
          }}
          required
          value={selectedCatValue}
        >
          {categoryData.length > 0 ? (
            <>
              <option disabled={true} value={"default"}>
                Select A Category
              </option>
              {categoryData.map((el) => {
                return (
                  <option value={el.id} key={nanoid()}>
                    {el.name}
                  </option>
                );
              })}
            </>
          ) : (
            <option value="category" selected>
              Fetching Categories
            </option>
          )}
        </select>

        <input
          type="text"
          required
          placeholder="Enter a new task to be done"
          onChange={(e) => {
            setTaskAdded(e.target.value);
          }}
          value={taskAdded}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          className="flex-shrink-0 bg-[#243e8e] hover:bg-[#323754] border-[#243e8e] hover:border-[#323754] text-sm border-4 text-white py-1 px-2 rounded duration-300"
          type="submit"
          id="submit"
          value="Add New Task"
        />
      </form>

      <div class="relative overflow-x-auto w-full max-w-sm p-1 border-2 border-[#000080] rounded-lg">
        {categoryData
          ? categoryData.map((item) => {
              return <ToDoList data={item} />;
            })
          : null}
      </div>
    </div>
  );
};

export default ToDoInput;
