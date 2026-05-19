import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../Styles/index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Calendar from './Calendar.jsx'
import Create from './create.tsx'  // ADD THIS
import Help from './Help.tsx'  // ADD THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/create" element={<Create />} />  {/* ADD THIS */}
        <Route path="/help" element={<Help />} />  // ADD THIS
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)