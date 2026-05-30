import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../Styles/index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Calendar from './Calendar.jsx'
import Create from './Create.tsx'
import Help from './Help.tsx'
import Team from './Team.jsx'
import About from './About.jsx'
import Chat from './chat.tsx'
import Dashboard from "./dashboard.jsx";
import Resources from "./resources.jsx"
import Problems from "./problems.jsx"

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