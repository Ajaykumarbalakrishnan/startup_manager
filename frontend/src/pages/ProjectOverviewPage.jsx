import { useOutletContext } from "react-router-dom";

export default function ProjectOverviewPage() {
  const { project } = useOutletContext();

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Overview</h2>

      <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 10 }}>
        <div><b>Name:</b> {project.name}</div>
        <div><b>Status:</b> {project.status}</div>
        <div><b>Description:</b> {project.description || "—"}</div>
      </div>

      <p style={{ marginTop: 12, opacity: 0.8 }}>
        Next we’ll show phase/stage progress and recent activity here.
      </p>
    </div>
  );
}