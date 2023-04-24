import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoInput from "./Components/ToDoInput";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ToDoInput />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
