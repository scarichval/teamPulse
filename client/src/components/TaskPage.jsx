import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      console.log("TASKS:", res.data);
      setTasks(res.data.tasks);
    } catch (err) {
      alert("Failed to load tasks");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a task ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{task.title}</span>
            <span className="text-sm text-gray-500">{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
