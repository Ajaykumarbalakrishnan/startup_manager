import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../api/client";

export default function ProjectsPage() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("planned");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadCompanies = async () => {
    try {
      const data = await apiGet("/companies/");
      setCompanies(data);
      if (data.length > 0) setSelectedCompanyId(String(data[0].id));
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  const loadProducts = async (companyId) => {
    try {
      const q = companyId ? `?company=${companyId}` : "";
      const data = await apiGet(`/products/${q}`);
      setProducts(data);
      if (data.length > 0) setSelectedProductId(String(data[0].id));
      else setSelectedProductId("");
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  const loadProjects = async (productId) => {
    try {
      if (!productId) {
        setProjects([]);
        return;
      }
      const data = await apiGet(`/projects/?product=${productId}`);
      setProjects(data);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompanyId) loadProducts(selectedCompanyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyId]);

  useEffect(() => {
    if (selectedProductId) loadProjects(selectedProductId);
    else setProjects([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductId]);

  const addProject = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed || !selectedProductId) return;

    setIsSaving(true);
    try {
      await apiPost("/projects/", {
        product: Number(selectedProductId),
        name: trimmed,
        status,
        description,
      });
      setName("");
      setStatus("planned");
      setDescription("");
      loadProjects(selectedProductId);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <h1 style={{ marginTop: 0 }}>Projects</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 14, opacity: 0.8 }}>Company:</span>
        <select
          value={selectedCompanyId}
          onChange={(e) => setSelectedCompanyId(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", minWidth: 240 }}
        >
          {companies.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <span style={{ fontSize: 14, opacity: 0.8 }}>Product:</span>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", minWidth: 240 }}
        >
          {products.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={addProject} style={{ display: "grid", gap: 10, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name..."
            style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", minWidth: 160 }}
          >
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
            <option value="paused">Paused</option>
          </select>
          <button
            type="submit"
            disabled={isSaving || !selectedProductId}
            style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
          >
            {isSaving ? "Adding..." : "Add Project"}
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)..."
          rows={3}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
      </form>

      {!selectedProductId ? (
        <p>Select a product to view projects.</p>
      ) : projects.length === 0 ? (
        <p>No projects for this product yet.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <b>{p.name}</b> — {p.status}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}