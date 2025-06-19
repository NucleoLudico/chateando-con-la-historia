import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import PanelCurador from './pages/PanelCurador';
import PanelAdmin from './pages/PanelAdmin';
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
          <Route path="/curador" element={<PanelCurador />} />
          <Route path="/admin" element={<PanelAdmin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
