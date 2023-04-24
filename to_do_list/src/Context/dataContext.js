import { createContext, useState} from "react";
import axios from "axios";
import BASE_URL from "../Constant/Constant";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [todolist, setTodoList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchTodoList = async () => {
    try {
      const { status, data } = await axios.get(`${BASE_URL}todos`);
      if (status === 200) {

        setTodoList(data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}categories`);

      if (res.status === 200) {
        return setCategoryData(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        todolist,
        setTodoList,
        fetchTodoList,
        categoryData,
        setCategoryData,
        fetchCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
