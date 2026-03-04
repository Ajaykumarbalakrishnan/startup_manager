import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../api/client";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    apiGet("/companies/")
      .then(setCompanies)
      .catch((e) => setError(String(e.message || e)));
  };

  useEffect(() => {
    load();
  }, []);

  const addCompany = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed) return;

    setIsSaving(true);
    try {
      await apiPost("/companies/", { name: trimmed, status });
      setName("");
      setStatus("active");
      load();
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <h1 style={{ marginTop: 0 }}>Companies</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <form onSubmit={addCompany} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Company name..."
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          type="submit"
          disabled={isSaving}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
        >
          {isSaving ? "Adding..." : "Add"}
        </button>
      </form>

      {companies.length === 0 ? (
        <p>No companies yet.</p>
      ) : (
        <ul>
          {companies.map((c) => (
            <li key={c.id}>
              <b>{c.name}</b> — {c.status}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}