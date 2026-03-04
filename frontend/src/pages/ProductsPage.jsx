import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../api/client";

export default function ProductsPage() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadCompanies = () => {
    apiGet("/companies/")
      .then((data) => {
        setCompanies(data);
        if (data.length > 0) setSelectedCompanyId(String(data[0].id));
      })
      .catch((e) => setError(String(e.message || e)));
  };

  const loadProducts = (companyId) => {
    const q = companyId ? `?company=${companyId}` : "";
    apiGet(`/products/${q}`)
      .then(setProducts)
      .catch((e) => setError(String(e.message || e)));
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompanyId) loadProducts(selectedCompanyId);
  }, [selectedCompanyId]);

  const addProduct = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (!trimmed || !selectedCompanyId) return;

    setIsSaving(true);
    try {
      await apiPost("/products/", {
        company: Number(selectedCompanyId),
        name: trimmed,
        status,
      });
      setName("");
      setStatus("active");
      loadProducts(selectedCompanyId);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <h1 style={{ marginTop: 0 }}>Products</h1>
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
      </div>

      <form onSubmit={addProduct} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name..."
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
          disabled={isSaving || !selectedCompanyId}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
        >
          {isSaving ? "Adding..." : "Add"}
        </button>
      </form>

      {products.length === 0 ? (
        <p>No products for this company yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <b>{p.name}</b> — {p.status}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}