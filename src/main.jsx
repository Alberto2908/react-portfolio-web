import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import AdminExperienciaForm from './pages/AdminExperienciaForm.jsx'
import AdminFormacionForm from './pages/AdminFormacionForm.jsx'
import AdminHabilidadForm from './pages/AdminHabilidadForm.jsx'
import AdminProyectoForm from './pages/AdminProyectoForm.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AdminRoute from './routes/AdminRoute.jsx'
import axios from 'axios'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/experiencia/nuevo" element={<AdminRoute><AdminExperienciaForm /></AdminRoute>} />
        <Route path="/admin/experiencia/:id" element={<AdminRoute><AdminExperienciaForm /></AdminRoute>} />
        <Route path="/admin/formacion/nuevo" element={<AdminRoute><AdminFormacionForm /></AdminRoute>} />
        <Route path="/admin/formacion/:id" element={<AdminRoute><AdminFormacionForm /></AdminRoute>} />
        <Route path="/admin/habilidad/nuevo" element={<AdminRoute><AdminHabilidadForm /></AdminRoute>} />
        <Route path="/admin/habilidad/:id" element={<AdminRoute><AdminHabilidadForm /></AdminRoute>} />
        <Route path="/admin/proyecto/nuevo" element={<AdminRoute><AdminProyectoForm /></AdminRoute>} />
        <Route path="/admin/proyecto/:id" element={<AdminRoute><AdminProyectoForm /></AdminRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
