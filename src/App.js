import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setNewTask] = useState("");

  useEffect(() => {
    setTodos(loadTodos());
  }, []);
  const loadTodos = () => {
    return JSON.parse(localStorage.getItem("todos") ?? "[]");
  };

  const addTodo = (title) => {
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        title: title,
        completed: false,
      },
    ];

    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const toggleStatus = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == id) todo.completed = !todo.completed;
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const clearAllCompleted = () => {
    if (!window.confirm("Are you sure")) return;
    const newTodos = todos.filter((todo) => todo.completed !== true);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  return (
    <>
      <TodoList
        todos={todos}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleStatus={toggleStatus}
        clearAllCompleted={clearAllCompleted}
      />
    </>
  );
}

export default App;
