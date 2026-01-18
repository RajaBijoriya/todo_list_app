import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel backend
});

export const getTodos = () => api.get("/todos");
export const createTodo = (title) => api.post("/todos", { title });
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
