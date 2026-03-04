import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { apiGet, apiPost } from "../api/client";

export default function ProjectStagesPage() {
  const { projectId } = useOutletContext();

  const [phases, setPhases] = useState([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState("");

  const [stages, setStages] = useState([]);

  const [newStageName, setNewStageName] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPhases = async () => {
    try {
      const data = await apiGet(`/phases/?project=${projectId}`);
      setPhases(data);
      if (data.length > 0) setSelectedPhaseId(String(data[0].id));
      else setSelectedPhaseId("");
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  const loadStages = async (phaseId) => {
    try {
      if (!phaseId) {
        setStages([]);
        return;
      }
      const data = await apiGet(`/stages/?phase=${phaseId}`);
      setStages(data);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  useEffect(() => {
    setError("");
    loadPhases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    setError("");
    loadStages(selectedPhaseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhaseId]);

  const addStage = async (e) => {
    e.preventDefault();
    setError("");
    const name = newStageName.trim();
    if (!name || !selectedPhaseId) return;

    setSaving(true);
    try {
      await apiPost("/stages/", {
        phase: Number(selectedPhaseId),
        name,
        status: "planned",
        order: stages.length + 1,
      });
      setNewStageName("");
      await loadStages(selectedPhaseId);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Stages</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
        <section style={{ borderRight: "1px solid #ddd", paddingRight: 16 }}>
          <h3 style={{ marginTop: 0 }}>Phases</h3>

          {phases.length === 0 ? (
            <p>No phases yet. Create one first.</p>
          ) : (
            phases.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPhaseId(String(p.id))}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 12px",
                  marginBottom: 8,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: String(p.id) === selectedPhaseId ? "#f3f3f3" : "white",
                  cursor: "pointer",
                }}
              >
                <b>{p.name}</b>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{p.status}</div>
              </button>
            ))
          )}
        </section>

        <section>
          <h3 style={{ marginTop: 0 }}>Stages for Selected Phase</h3>

          <form onSubmit={addStage} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <input
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
              placeholder="Add stage (e.g. Requirements, Development, Testing)..."
              style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
            />
            <button
              type="submit"
              disabled={saving || !selectedPhaseId}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
            >
              Add
            </button>
          </form>

          {!selectedPhaseId ? (
            <p>Select a phase to view and manage its stages.</p>
          ) : stages.length === 0 ? (
            <p>No stages yet for this phase.</p>
          ) : (
            <ul>
              {stages.map((s) => (
                <li key={s.id}>
                  <b>{s.name}</b> — {s.status}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
