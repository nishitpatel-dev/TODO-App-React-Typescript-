import AddToDo from "./components/AddToDo";
import Navbar from "./components/Navbar";
import ShowTodos from "./components/ShowTodos";
import "./App.css"

const App = () => {
  return (
    <main>
      <h1>TODO ( REACT + TYPESCRIPT )</h1>
      <Navbar />
      <AddToDo />
      <ShowTodos />
    </main>
  );
};

export default App;
