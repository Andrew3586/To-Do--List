import React, { useEffect, useState, useContext } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../Constant/Constant";
import DataContext from "../Context/dataContext";

const AllTodos = ({ id }) => {
  const { categoryData } = useContext(DataContext);
  const [oneCatAndTodo, setOneCatAndTodo] = useState([]);
  const fetchOneCategoryAndTodo = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}categories/${id}/todos`);
      if (res.status === 200) {
        return setOneCatAndTodo(res.data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneCategoryAndTodo(id);
  }, [categoryData]);

  const deleteTodoHandler = async (e, todoId, categoryId) => {
    try {
      e.preventDefault();
      console.log(todoId, categoryId);
      const { status, data } = await axios.delete(
        `${BASE_URL}categories/${categoryId}/todos/${todoId}/delete`
      );
      if (status === 200) {
        alert(data.message);
        return fetchOneCategoryAndTodo(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [taskEdit, setTaskEdit] = useState({
    id: null,
    todoName: "",
  });

  const updateTodoHandler = async (e, categoryId) => {
    try {
      e.preventDefault();
      const { status, data } = await axios.put(
        `${BASE_URL}categories/${categoryId}/todos/${taskEdit.id}/edit`,
        { name: taskEdit.todoName }
      );
      if (status === 200) {
        alert(data.message);
        setTaskEdit({
          id: null,
          todoName: "",
        });
        return fetchOneCategoryAndTodo(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <>
      <h1>Task:</h1>
      <div id="task" className="flex flex-col">
        {oneCatAndTodo.length > 0
          ? oneCatAndTodo.map((item) => {
              return (
                <div className="flex justify-between">
                  <div>
                    {taskEdit.id === null ? (
                      <>
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            setChecked(!checked);
                          }}
                        />
                        <span
                          className={checked === true ? "line-through" : "none"}
                        >
                          {item.name}
                        </span>
                      </>
                    ) : (
                      <input
                        type="text"
                        onChange={(e) => {
                          setTaskEdit((prev) => {
                            return { ...prev, todoName: e.target.value };
                          });
                        }}
                        value={taskEdit.todoName}
                      />
                    )}
                  </div>
                  <div>
                    {taskEdit.id === null ? (
                      <button
                        onClick={() => {
                          setTaskEdit((prev) => {
                            return { ...prev, id: item.id };
                          });
                        }}
                      >
                        <FiEdit3 />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          updateTodoHandler(e, id);
                        }}
                      >
                        Update Task
                      </button>
                    )}
                    <button>
                      <MdOutlineDeleteOutline
                        onClick={(e) => {
                          deleteTodoHandler(e, item.id, item.category_id);
                        }}
                      />
                    </button>
                  </div>
                </div>
              );
            })
          : "No Task"}
      </div>
    </>
  );
};

export default AllTodos;
