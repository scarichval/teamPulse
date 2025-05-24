import { useEffect, useState } from "react";
import API from "../services/api";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        console.log("TASKS:", res.data);
        setTasks(res.data.tasks);
      } catch (err) {
        alert("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} – {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
