import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../api/client";

export default function TasksPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/projects/")
      .then((data) => {
        setProjects(data);
        if (data.length > 0) setSelectedProjectId(data[0].id);
      })
      .catch((e) => setError(String(e.message || e)));
  }, []);

  const loadTasks = () => {
    if (!selectedProjectId) return;
    apiGet(`/tasks/?project=${selectedProjectId}`)
      .then(setTasks)
      .catch((e) => setError(String(e.message || e)));
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectId]);

  const addTask = async (e) => {
    e.preventDefault();
    setError("");

    const title = newTaskTitle.trim();
    if (!title || !selectedProjectId) return;

    setIsSaving(true);
    try {
      await apiPost("/tasks/", { project: selectedProjectId, title, status: "todo" });
      setNewTaskTitle("");
      loadTasks();
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <h1 style={{ marginTop: 0 }}>Tasks</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        <section style={{ borderRight: "1px solid #ddd", paddingRight: 16 }}>
          <h3 style={{ marginTop: 0 }}>Projects</h3>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                marginBottom: 8,
                borderRadius: 8,
                border: "1px solid #ddd",
                background: p.id === selectedProjectId ? "#f3f3f3" : "white",
                cursor: "pointer",
              }}
            >
              <b>{p.name}</b>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{p.status}</div>
            </button>
          ))}
        </section>

        <section>
          <h3 style={{ marginTop: 0 }}>Tasks</h3>

          <form onSubmit={addTask} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="New task title..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />
            <button
              type="submit"
              disabled={!selectedProjectId || isSaving}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                cursor: isSaving ? "not-allowed" : "pointer",
                background: "white",
              }}
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
        </section>
      </div>
    </Layout>
  );
}