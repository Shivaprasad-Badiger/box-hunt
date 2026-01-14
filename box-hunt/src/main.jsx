import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CorrectedVersion from './CorrectedVersion.jsx'
import { Routes, Route, HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/corrected" element={<CorrectedVersion />} />
      </Routes>
    </HashRouter>
)
