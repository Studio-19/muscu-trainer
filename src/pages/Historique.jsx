import { useMemo, useState } from 'react'
import { getData } from '../storage.js'
import { EXERCISES_BY_ID, GROUP_BY_EXERCISE_ID } from '../data/exercises.js'

const pad = (n) => String(n).padStart(2, '0')
const fmtDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const MONTH_NAMES_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]
const DOW_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Build a 7-col flat array of Date|null for the given month.
// Pads leading nulls so the first day lands on the right Monday-first column.
function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1)
  const weekdayMonFirst = (first.getDay() + 6) % 7 // 0 = Mon
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < weekdayMonFirst; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function Historique() {
  const data = useMemo(() => getData(), [])
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState(fmtDate(today))

  // Group history logs by their date string for O(1) lookup.
  const historyByDate = useMemo(() => {
    const map = {}
    for (const log of data.history ?? []) {
      if (!map[log.date]) map[log.date] = []
      map[log.date].push(log)
    }
    return map
  }, [data])

  // Resolve session names from sessionId (may be missing if session was deleted).
  const sessionsById = useMemo(() => {
    const map = {}
    for (const s of data.programme?.sessions ?? []) map[s.id] = s
    return map
  }, [data])

  const cells = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  )

  const goPrev = () =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
  const goNext = () =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
  const goToday = () => {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(fmtDate(today))
  }

  const todayKey = fmtDate(today)
  const selectedLogs = historyByDate[selectedDate] ?? []
  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null

  const totalSessions = (data.history ?? []).length
  const totalDays = Object.keys(historyByDate).length

  return (
    <div className="fade-in">
      <header className="page-head">
        <div>
          <div className="eyebrow">Historique</div>
          <h1>Calendrier<em>.</em></h1>
        </div>
        <div className="meta">
          <div>Sessions · <strong>{totalSessions}</strong></div>
          <div>Jours actifs · <strong>{totalDays}</strong></div>
        </div>
      </header>

      {/* Calendar */}
      <div className="cal">
        <div className="cal-head">
          <div className="cal-title">
            {MONTH_NAMES_FR[cursor.getMonth()]} <span className="cal-year">{cursor.getFullYear()}</span>
          </div>
          <div className="cal-nav">
            <button type="button" className="btn ghost sm icon-only" onClick={goPrev} aria-label="Mois précédent">‹</button>
            <button type="button" className="btn ghost sm" onClick={goToday}>Aujourd'hui</button>
            <button type="button" className="btn ghost sm icon-only" onClick={goNext} aria-label="Mois suivant">›</button>
          </div>
        </div>

        <div className="cal-grid">
          {DOW_FR.map((d) => (
            <div className="cal-dow" key={d}>{d}</div>
          ))}

          {cells.map((d, i) => {
            if (!d) return <div className="cal-cell empty" key={`e-${i}`} />
            const key = fmtDate(d)
            const has = !!historyByDate[key]
            const isToday = key === todayKey
            const isSelected = key === selectedDate
            return (
              <button
                type="button"
                key={key}
                className={[
                  'cal-cell',
                  has ? 'has' : '',
                  isToday ? 'today' : '',
                  isSelected ? 'selected' : ''
                ].filter(Boolean).join(' ')}
                onClick={() => setSelectedDate(key)}
              >
                <span className="num">{d.getDate()}</span>
                {has && <span className="dot" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected day */}
      <div className="sect-head">
        <div className="title">
          {selectedDateObj
            ? selectedDateObj.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            : 'Aucune date sélectionnée'}
        </div>
        <div className="sub">
          {selectedLogs.length === 0
            ? '—'
            : `${selectedLogs.length} séance${selectedLogs.length > 1 ? 's' : ''}`}
        </div>
      </div>

      {selectedLogs.length === 0 ? (
        <div className="empty">Aucune séance ce jour-là.</div>
      ) : (
        <div className="day-logs">
          {selectedLogs.map((log) => {
            const sess = sessionsById[log.sessionId]
            // Priorité : snapshot du log (sessionName) > nom courant > fallback
            const sessionName = log.sessionName ?? sess?.name ?? 'Séance supprimée'
            const sessionExists = !!sess

            let totalSets = 0
            let workingSets = 0
            let volume = 0
            const exoCount = (log.entries ?? []).length
            for (const e of log.entries ?? []) {
              for (const s of e.sets ?? []) {
                totalSets++
                const w = Number(s.weight) || 0
                const r = Number(s.reps) || 0
                if (w > 0 || r > 0) workingSets++
                volume += w * r
              }
            }

            return (
              <div className="day-log-card" key={log.id}>
                <div className="day-log-head">
                  <div>
                    <div className="group-tag">
                      Séance · {exoCount} exo{exoCount > 1 ? 's' : ''}
                      {!sessionExists && log.sessionId && ' · template supprimé'}
                    </div>
                    <div className="ex-name">{sessionName}</div>
                  </div>
                  <div className="day-log-metrics">
                    <div className="metric">
                      <div className="k">Séries</div>
                      <div className="v">
                        {workingSets}<small>/ {totalSets}</small>
                      </div>
                    </div>
                    <div className="metric">
                      <div className="k">Volume</div>
                      <div className="v">
                        {Math.round(volume).toLocaleString('fr-FR')}<small>kg</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="exo-detail-list">
                  {(log.entries ?? []).map((entry, i) => {
                    const meta = EXERCISES_BY_ID[entry.exerciseId]
                    const group = GROUP_BY_EXERCISE_ID[entry.exerciseId]
                    const exoName = meta?.name ?? entry.exerciseId
                    const groupName = group?.name
                    const equipment = meta?.equipment
                    return (
                      <div className="exo-detail" key={i}>
                        <div className="exo-detail-meta">
                          {[groupName, equipment].filter(Boolean).join(' · ') || '—'}
                          {entry.repsTarget != null && (
                            <> · cible {entry.repsTarget} reps</>
                          )}
                          {entry.restSec != null && (
                            <> · repos {entry.restSec}s</>
                          )}
                        </div>
                        <div className="exo-detail-name">{exoName}</div>
                        <div className="exo-sets">
                          {(entry.sets ?? []).length === 0 && (
                            <span className="exo-set empty">—</span>
                          )}
                          {(entry.sets ?? []).map((s, j) => {
                            const w = s.weight === '' || s.weight == null ? null : Number(s.weight)
                            const r = s.reps === '' || s.reps == null ? null : Number(s.reps)
                            const empty = w == null && r == null
                            return (
                              <span className={`exo-set ${empty ? 'empty' : ''}`} key={j}>
                                <span className="set-i">{j + 1}</span>
                                {empty ? (
                                  '—'
                                ) : (
                                  <>
                                    {w ?? '—'}<span className="x">kg ×</span>{r ?? '—'}
                                  </>
                                )}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
