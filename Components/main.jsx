import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../Styles/index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Calendar from './Calendar.jsx'
import Create from './create.tsx'  // ADD THIS
import Help from './Help.tsx'  // ADD THIS
import Home from './Home.jsx'
import Team from './Team.jsx'
import About from './About.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/create" element={<Create />} />  {/* ADD THIS */}
        <Route path="/help" element={<Help />} />  // ADD THIS
        <Route path="/home" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
