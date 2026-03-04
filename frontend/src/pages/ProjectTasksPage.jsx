import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGet, apiPost } from "../api/client";

export default function ProjectTasksPage() {
  const { projectId } = useOutletContext();

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const data = await apiGet(`/tasks/?project=${projectId}`);
      setTasks(data);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  useEffect(() => {
    setError("");
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const addTask = async (e) => {
    e.preventDefault();
    setError("");

    const title = newTaskTitle.trim();
    if (!title) return;

    setIsSaving(true);
    try {
      await apiPost("/tasks/", {
        project: Number(projectId),
        title,
        status: "todo",
      });
      setNewTaskTitle("");
      loadTasks();
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Tasks</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <form onSubmit={addTask} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          disabled={isSaving}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
        >
          {isSaving ? "Adding..." : "Add Task"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks for this project yet.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <b>{t.title}</b> — {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}