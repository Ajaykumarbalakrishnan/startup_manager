import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { apiGet } from "../api/client";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  const loadProject = async () => {
    try {
      const data = await apiGet(`/projects/${projectId}/`);
      setProject(data);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  useEffect(() => {
    setError("");
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const tabStyle = ({ isActive }) => ({
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    textDecoration: "none",
    color: "black",
    background: isActive ? "#f3f3f3" : "white",
    display: "inline-block",
  });

  return (
    <Layout>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 style={{ marginTop: 0, marginBottom: 4 }}>
            {project ? project.name : "Loading..."}
          </h1>
          {project ? (
            <div style={{ fontSize: 14, opacity: 0.8 }}>
              Status: <b>{project.status}</b>
            </div>
          ) : null}
        </div>

        <Link
          to="/projects"
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            textDecoration: "none",
            color: "black",
            background: "white",
          }}
        >
          ← Back to Projects
        </Link>
      </div>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <NavLink to="overview" style={tabStyle}>Overview</NavLink>
        <NavLink to="phases" style={tabStyle}>Phases</NavLink>
        <NavLink to="stages" style={tabStyle}>Stages</NavLink>
        <NavLink to="meetings" style={tabStyle}>Meetings</NavLink>
        <NavLink to="tasks" style={tabStyle}>Tasks</NavLink>
        <NavLink to="notes" style={tabStyle}>Notes</NavLink>
        <NavLink to="finance" style={tabStyle}>Finance</NavLink>
        <NavLink to="vault" style={tabStyle}>Vault</NavLink>
        
      </div>

      <div style={{ marginTop: 16 }}>
        <Outlet context={{ project, projectId }} />
      </div>
    </Layout>
  );
}