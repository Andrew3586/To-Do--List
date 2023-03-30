import { BrowserRouter, Routes, Route, } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoInput from "./Components/ToDoInput";
import ToDoEdit from "./Components/ToDoEdit";

function App() {

  return (

  <div>
  <BrowserRouter>
  <Routes>
      <Route exact path="/" element={<ToDoInput />} />
          </Routes>
          <Routes>
      <Route path="/todoedit/:id" element={<ToDoEdit />} />
      </Routes>
  </BrowserRouter>
</div>
  );
  }
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ToDoList />} />
//         <Route path="/ToDoEdit" element={<ToDoEdit />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

export default App;

// import ToDoInput from "./Components/ToDoInput";
// import ToDoEdit from "./Components/ToDoEdit";

// function App() {
//   return (
//     <div className="App">
//       <ToDoInput />
//       <ToDoEdit />
//     </div>
//   );
// }



// export default App;
