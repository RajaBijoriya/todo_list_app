import { useState } from "react";
import { updateTodo, deleteTodo } from "../api/todoApi";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = async () => {
    try {
      const res = await updateTodo(todo.id, { completed: !todo.completed });
      onUpdate(res.data);
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(todo.id);
        onDelete(todo.id);
      } catch (err) {
        console.error("DELETE ERROR:", err);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editTitle.trim()) {
      try {
        const res = await updateTodo(todo.id, { title: editTitle });
        onUpdate(res.data);
        setIsEditing(false);
      } catch (err) {
        console.error("UPDATE ERROR:", err);
      }
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="todo-input"
            autoFocus
          />
        ) : (
          <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.title}
          </span>
        )}
      </div>
      <div className="todo-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit} className="btn btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-delete">
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
