import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import EstudianteInicio from './pages/EstudianteInicio';
import EstudianteChat from './pages/EstudianteChat';
import PanelCurador from './pages/PanelCurador';
import PanelAdmin from './pages/PanelAdmin';
import PanelDocente from './pages/PanelDocente';
import DocenteDesafios from './pages/DocenteDesafios';
import DocenteReflexiones from './pages/DocenteReflexiones';
import DocenteComparativa from './pages/DocenteComparativa';
h0f1kp-codex/integrar-backend-con-frontend-para-panel-docente
import DocenteResumenEstudiante from './pages/DocenteResumenEstudiante';
import DocenteMensajesEstudiantes from './pages/DocenteMensajesEstudiantes';
main
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:characterId" element={<Chat />} />
          <Route path="/estudiante" element={<EstudianteInicio />} />
          <Route path="/estudiante/chat/:personajeId" element={<EstudianteChat />} />
          <Route path="/curador" element={<PanelCurador />} />
          <Route path="/admin" element={<PanelAdmin />} />
          <Route path="/docente" element={<PanelDocente />} />
          <Route path="/docente/desafios" element={<DocenteDesafios />} />
          <Route path="/docente/reflexiones" element={<DocenteReflexiones />} />
          <Route path="/docente/comparativa" element={<DocenteComparativa />} />
h0f1kp-codex/integrar-backend-con-frontend-para-panel-docente
          <Route path="/docente/estudiante/:estudianteId" element={<DocenteResumenEstudiante />} />
          <Route path="/docente/mensajes-estudiantes" element={<DocenteMensajesEstudiantes />} />
main
        </Routes>
      </div>
    </BrowserRouter>
  );
}
