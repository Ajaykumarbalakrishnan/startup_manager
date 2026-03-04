import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: "system-ui", padding: 20, display: "flex", gap: 20 }}>
      <Sidebar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}