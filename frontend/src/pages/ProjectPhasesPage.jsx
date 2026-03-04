import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGet, apiPost } from "../api/client";

export default function ProjectPhasesPage() {
  const { projectId } = useOutletContext();

  const [phases, setPhases] = useState([]);

  const [newPhaseName, setNewPhaseName] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPhases = async () => {
    try {
      const data = await apiGet(`/phases/?project=${projectId}`);
      setPhases(data);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  useEffect(() => {
    setError("");
    loadPhases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const addPhase = async (e) => {
    e.preventDefault();
    setError("");
    const name = newPhaseName.trim();
    if (!name) return;

    setSaving(true);
    try {
      await apiPost("/phases/", {
        project: Number(projectId),
        name,
        status: "planned",
        order: phases.length + 1,
      });
      setNewPhaseName("");
      await loadPhases();
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Phases</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <form onSubmit={addPhase} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          value={newPhaseName}
          onChange={(e) => setNewPhaseName(e.target.value)}
          placeholder="Add phase (e.g. POC, Pilot, Production)..."
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          disabled={saving}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
        >
          Add
        </button>
      </form>

      {phases.length === 0 ? (
        <p>No phases yet.</p>
      ) : (
        <ul>
          {phases.map((p) => (
            <li key={p.id}>
              <b>{p.name}</b> — {p.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}