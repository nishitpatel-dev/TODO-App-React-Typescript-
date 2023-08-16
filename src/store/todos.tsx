import { ReactNode, createContext, useState } from "react";

export type TodoProviderProps = {
  children: ReactNode;
};

export type MyTodo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export interface TodosContext {
  todos: MyTodo[];
  handleAddToDo: (task: string) => void;
  handleChangeTodo: (id: string) => void;
  handleDelteTodo: (id: string) => void;
}

export const todoContext = createContext<TodosContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<MyTodo[]>(() => {
    try {
      const localStorageData = localStorage.getItem("todos") || "[]";

      return JSON.parse(localStorageData) as MyTodo[];
    } catch (error) {
      return [];
    }
  });

  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const newTodos: MyTodo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      //   console.log(prev);

      //   console.log(newTodos);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  };

  const handleChangeTodo = (id: string) => {
    setTodos((prev) => {
      let updatedTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const handleDelteTodo = (id: string) => {
    setTodos((prev) => {
      let afterDeleteTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(afterDeleteTodos));

      return afterDeleteTodos;
    });
  };

  return (
    <todoContext.Provider
      value={{ todos, handleAddToDo, handleChangeTodo, handleDelteTodo }}
    >
      {children}
    </todoContext.Provider>
  );
};
