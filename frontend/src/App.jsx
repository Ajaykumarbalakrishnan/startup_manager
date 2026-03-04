import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CompaniesPage from "./pages/CompaniesPage";
import ProductsPage from "./pages/ProductsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import MeetingsPage from "./pages/MeetingsPage";
import NotesPage from "./pages/NotesPage";
import FinancePage from "./pages/FinancePage";
import VaultPage from "./pages/VaultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/companies" replace />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/vault" element={<VaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}