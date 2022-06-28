import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [isAtleastOneCompleted, setIsAtLeastOneCompleted] = useState(false);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed) {
        setIsAtLeastOneCompleted(true);
        return;
      }
    }
    setIsAtLeastOneCompleted(false);
  }, [todos]);
  const loadTodos = () => {
    return JSON.parse(localStorage.getItem("todos") ?? "[]");
  };

  const addTodo = (title) => {
    if (todos.length > 9) return;
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
    const newTodos = todos.filter((todo) => {
      if (todo.id == id) {
        if (todo.title === "Anjal King 👑") {
          console.log(todo.title == "Anjal King 👑");
          console.log(todo.title);
          console.log(todo);
          Swal.fire({
            title: "Can't disable the king, bitch!!!  ",
            confirmButtonText: "Sorry",
          });
          return todo;
        }
      } else {
        return todo;
      }
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const toggleStatus = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == id) {
        if (todo.title === "Anjal King 👑") {
          console.log(todo.title == "Anjal King 👑");
          console.log(todo.title);
          console.log(todo);
          Swal.fire({
            title: "Can't disable the king, bitch!!!  ",
            confirmButtonText: "Sorry",
          });
        } else {
          todo.completed = !todo.completed;
        }
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const clearAllCompleted = () => {
    Swal.fire({
      title: "Are you sure want to remove all completed todos?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodos = todos.filter((todo) => todo.completed !== true);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
        Swal.fire(
          "Deleted!",
          "Your completed todos has been deleted.",
          "success"
        );
      }
    });
  };

  const completeAllTodos = () => {};
  return (
    <>
      <TodoList
        todos={todos}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleStatus={toggleStatus}
        clearAllCompleted={clearAllCompleted}
        isAtleastOneCompleted={isAtleastOneCompleted}
      />
    </>
  );
}

export default App;
