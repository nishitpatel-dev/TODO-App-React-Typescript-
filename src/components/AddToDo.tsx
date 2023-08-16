import { FormEvent, useContext, useState } from "react";
import { todoContext } from "../store/todos";

const AddToDo = () => {
  const [todo, setTodo] = useState("");

  const todoConsumer = useContext(todoContext);

  const handleAddToDo = todoConsumer?.handleAddToDo; // Using optional chaining

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleAddToDo && todo !== "") {
      handleAddToDo(todo);
      setTodo("");
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddToDo;
