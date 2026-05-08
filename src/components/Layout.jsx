import { NavLink, Outlet } from 'react-router-dom'

const Icon = ({ name }) => {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'flash':
      return <svg {...common}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
    case 'list':
      return <svg {...common}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
    case 'chart':
      return <svg {...common}><path d="M3 3v18h18M7 14l3-3 4 4 5-6" /></svg>
    case 'calendar':
      return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>
    case 'spark':
      return <svg {...common}><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2z" /><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" /></svg>
    default:
      return null
  }
}

export default function Layout() {
  return (
    <div className="shell">
      <aside className="nav">
        <div className="nav-brand">
          <div className="brand">
            <div className="brand-mark"><span>F</span></div>
            <div>
              <div className="brand-name">FORZA</div>
              <div className="brand-sub">Muscu · Telemetry</div>
            </div>
          </div>
        </div>

        <nav className="nav-list">
          <div className="nav-section-label">Pilotage</div>
          <NavLink to="/seance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="ic"><Icon name="flash" /></span>
            <span className="nav-label">Séance du jour</span>
            <span className="nav-label-mobile">Séance</span>
          </NavLink>
          <NavLink to="/programme" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="ic"><Icon name="list" /></span>
            <span className="nav-label">Programme</span>
            <span className="nav-label-mobile">Programme</span>
          </NavLink>
          <NavLink to="/historique" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="ic"><Icon name="calendar" /></span>
            <span className="nav-label">Historique</span>
            <span className="nav-label-mobile">Historique</span>
          </NavLink>
          <NavLink to="/coach" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="ic"><Icon name="spark" /></span>
            <span className="nav-label">Coach IA</span>
            <span className="nav-label-mobile">Coach</span>
          </NavLink>
        </nav>

        <div className="nav-foot">
          <span className="live"><span className="dot" /> LOCAL · v0.1</span>
          <span>Stockage navigateur</span>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
