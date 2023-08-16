import { useContext } from "react";
import { todoContext } from "../store/todos";
import { useSearchParams } from "react-router-dom";

const ShowTodos = () => {
  const [searchparam] = useSearchParams();

  let todosData = searchparam.get("todos");
  //   console.log(todosData);

  const todoConsumer = useContext(todoContext);

  const todos = todoConsumer?.todos;
  const handleChangeTodo = todoConsumer?.handleChangeTodo;
  const handleDelteTodo = todoConsumer?.handleDelteTodo;

  if (!handleChangeTodo || !handleDelteTodo) {
    throw new Error("Something Went Wrong.");
  }

  let filterData = todos || [];

  if (todosData === "active") {
    filterData = filterData.filter((todo) => !todo.completed);
  }
  if (todosData === "completed") {
    filterData = filterData.filter((todo) => todo.completed);
  }
  return (
    <>
      <ul className="main-task">
        {filterData.map((todo) => {
              return (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    id={todo.id}
                    checked={todo.completed}
                    onChange={() => handleChangeTodo(todo.id)}
                  />
                  <label htmlFor={todo.id}>{todo.task}</label>

                  {todo.completed && (
                    <button
                      type="button"
                      onClick={() => handleDelteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              );
            })}
      </ul>
    </>
  );
};
export default ShowTodos;
