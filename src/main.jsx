import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminExperienciaForm from './pages/AdminExperienciaForm.jsx'
import AdminFormacionForm from './pages/AdminFormacionForm.jsx'
import AdminHabilidadForm from './pages/AdminHabilidadForm.jsx'
import AdminProyectoForm from './pages/AdminProyectoForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/experiencia/nuevo" element={<AdminExperienciaForm />} />
        <Route path="/admin/experiencia/:id" element={<AdminExperienciaForm />} />
        <Route path="/admin/formacion/nuevo" element={<AdminFormacionForm />} />
        <Route path="/admin/formacion/:id" element={<AdminFormacionForm />} />
        <Route path="/admin/habilidad/nuevo" element={<AdminHabilidadForm />} />
        <Route path="/admin/habilidad/:id" element={<AdminHabilidadForm />} />
        <Route path="/admin/proyecto/nuevo" element={<AdminProyectoForm />} />
        <Route path="/admin/proyecto/:id" element={<AdminProyectoForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
