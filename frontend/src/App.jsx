import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CompaniesPage from "./pages/CompaniesPage";
import ProductsPage from "./pages/ProductsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import MeetingsPage from "./pages/MeetingsPage";
import NotesPage from "./pages/NotesPage";
import FinancePage from "./pages/FinancePage";
import VaultPage from "./pages/VaultPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectOverviewPage from "./pages/ProjectOverviewPage";
import ProjectTasksPage from "./pages/ProjectTasksPage";
import ProjectMeetingsPage from "./pages/ProjectMeetingsPage";
import ProjectNotesPage from "./pages/ProjectNotesPage";
import ProjectFinancePage from "./pages/ProjectFinancePage";
import ProjectVaultPage from "./pages/ProjectVaultPage";
import ProjectPhasesPage from "./pages/ProjectPhasesPage";
import ProjectStagesPage from "./pages/ProjectStagesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/companies" replace />} />

        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/projects/:projectId" element={<ProjectDetailPage />}>
          <Route index element={<ProjectOverviewPage />} />
          <Route path="overview" element={<ProjectOverviewPage />} />
          <Route path="phases" element={<ProjectPhasesPage />} />
          <Route path="stages" element={<ProjectStagesPage />} />
          <Route path="tasks" element={<ProjectTasksPage />} />
          <Route path="meetings" element={<ProjectMeetingsPage />} />
          <Route path="notes" element={<ProjectNotesPage />} />
          <Route path="finance" element={<ProjectFinancePage />} />
          <Route path="vault" element={<ProjectVaultPage />} />
        </Route>

        <Route path="/tasks" element={<TasksPage />} />

        {/* global placeholders */}
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/vault" element={<VaultPage />} />
      </Routes>
    </BrowserRouter>
  );
}