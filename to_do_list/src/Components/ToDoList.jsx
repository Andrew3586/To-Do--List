import React, { useContext, useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../Constant/Constant";
import DataContext from "../Context/dataContext";
import AllTodos from "./AllTodos";

const ToDoList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const { fetchTodoList, fetchCategories } = useContext(DataContext);

  //Delete Category
  const deleteCatHandler = async (e, categoryId) => {
    try {
      e.preventDefault();
      const { status, data } = await axios.delete(
        `${BASE_URL}categories/${categoryId}`
      );
      if (status === 200) {
        fetchCategories();
        return fetchTodoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [catEdit, setCatEdit] = useState({
    id: null,
    catName: data.name,
  });

  const updateCatHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(catEdit);
      const { status, data } = await axios.put(
        `${BASE_URL}categories/${catEdit.id}/edit`,
        { category_name: catEdit.catName }
      );
      if (status === 200) {
        alert(data.message);
        setCatEdit({
          id: null,
          catName: "",
        });
        fetchCategories();
        return fetchTodoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b-2" key={data.id}>
      <div id="category" className="flex justify-between">
        <div className="flex gap-2">
          {catEdit.id === null ? (
            <>
              <h1>Category:</h1>
              <span>{data.name}</span>
            </>
          ) : (
            <input
              type="text"
              value={catEdit.catName}
              onChange={(e) => {
                setCatEdit((prev) => {
                  return { ...prev, catName: e.target.value };
                });
              }}
            />
          )}
        </div>
        <div>
          {catEdit.id === null ? (
            <button
              onClick={() => {
                setCatEdit((prev) => {
                  return { ...prev, id: data.id };
                });
              }}
            >
              <FiEdit3 />
            </button>
          ) : (
            <button onClick={updateCatHandler}>Update</button>
          )}
          <button>
            <MdOutlineDeleteOutline
              onClick={(e) => {
                setShowModal(true);
              }}
            />
          </button>
        </div>
      </div>
      <AllTodos id={data.id} />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Warning</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    After deleting a category all your tasks will be deleted click cancel to go back click delete to proceed.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      deleteCatHandler(e, data.id);
                      setShowModal(false);
                    }}
                  >
                    Proceed To Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ToDoList;
