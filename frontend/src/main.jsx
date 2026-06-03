import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import Login from './components/pages/Login.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import Create from './components/pages/Create.tsx'
import Help from './components/pages/Help.tsx'
import Team from './components/pages/Team.jsx'
import About from './components/pages/About.jsx'
import Chat from './components/pages/chat.tsx'
import Dashboard from "./components/pages/dashboard.jsx";
import Resources from "./components/pages/resources.jsx"
import Problems from "./components/pages/problems.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/team" element={<Team/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/problems" element={<Problems/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)