import { useEffect, useState } from "react";
import api from "../api/axios";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    api
      .get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleUpdate = (updatedTodo) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  const handleDelete = (todoId) => {
    setTodos(todos.filter((t) => t.id !== todoId));
  };

  return (
    <div className="todo-container">
      <h2>📝 Todo List</h2>
      <AddTodo onTodoAdded={fetchTodos} />
      <ul>
        {todos.length === 0 ? (
          <li style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
            No todos yet. Add one to get started!
          </li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
