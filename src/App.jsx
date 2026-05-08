import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Programme from './pages/Programme.jsx'
import SeanceDuJour from './pages/SeanceDuJour.jsx'
import Historique from './pages/Historique.jsx'
import Coach from './pages/Coach.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/seance" replace />} />
        <Route path="/seance" element={<SeanceDuJour />} />
        <Route path="/programme" element={<Programme />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/coach" element={<Coach />} />
        {/* Legacy redirect: /stats → /historique */}
        <Route path="/stats" element={<Navigate to="/historique" replace />} />
        <Route path="*" element={<Navigate to="/seance" replace />} />
      </Route>
    </Routes>
  )
}
