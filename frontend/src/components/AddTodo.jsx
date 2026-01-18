import { useState } from "react";
import api from "../api/axios";

function AddTodo({ onTodoAdded }) {
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    if (!title.trim()) {
      return;
    }
    try {
      await api.post("/todos", { title });
      setTitle("");
      if (onTodoAdded) {
        onTodoAdded();
      }
    } catch (err) {
      console.error("ADD TODO ERROR:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="add-todo-section">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new todo..."
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default AddTodo;
