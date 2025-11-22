import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminExperienciaForm from './pages/AdminExperienciaForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/experiencia/nuevo" element={<AdminExperienciaForm />} />
        <Route path="/admin/experiencia/:id" element={<AdminExperienciaForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
