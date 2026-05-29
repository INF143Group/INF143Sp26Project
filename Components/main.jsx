import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../Styles/index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Calendar from './Calendar/Calendar.jsx'
import Create from './Create.tsx'
import Help from './Help.tsx'
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
        <Route path="/create" element={<Create />} />
        <Route path="/help" element={<Help />} />
        <Route path="/home" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)