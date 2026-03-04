import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "black",
  border: "1px solid #ddd",
  background: isActive ? "#f3f3f3" : "white",
});

export default function Sidebar() {
  return (
    <aside style={{ width: 260, paddingRight: 16, borderRight: "1px solid #ddd" }}>
      <h2 style={{ marginTop: 0 }}>Startup Manager</h2>

      <div style={{ display: "grid", gap: 10 }}>
        <NavLink to="/companies" style={linkStyle}>Companies</NavLink>
        <NavLink to="/products" style={linkStyle}>Products</NavLink>
        <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
        <NavLink to="/meetings" style={linkStyle}>Meetings</NavLink>
        <NavLink to="/tasks" style={linkStyle}>Tasks</NavLink>
        <NavLink to="/notes" style={linkStyle}>Notes</NavLink>
        <NavLink to="/finance" style={linkStyle}>Finance</NavLink>
        <NavLink to="/vault" style={linkStyle}>Media Vault</NavLink>
      </div>
    </aside>
  );
}