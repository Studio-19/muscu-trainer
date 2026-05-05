import { useEffect, useState } from 'react'
import { getData, updateData, uid, findLastEntry } from '../storage.js'
import { EXERCISES_BY_ID, GROUP_BY_EXERCISE_ID } from '../data/exercises.js'

const todayStr = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function SeanceDuJour() {
  const [data, setLocal] = useState(getData())
  const [activeSessionId, setActiveSessionId] = useState(
    data.ui?.activeSessionId ?? data.programme.sessions[0]?.id
  )
  const [draft, setDraft] = useState(null)
  const [savedAt, setSavedAt] = useState(null)

  const session = data.programme.sessions.find((s) => s.id === activeSessionId) || data.programme.sessions[0]
  const date = todayStr()

  useEffect(() => {
    if (!session) return
    const existing = data.history.find((h) => h.date === date && h.sessionId === session.id)
    const built = session.exercises.map((e) => {
      const found = existing?.entries.find((x) => x.exerciseId === e.exerciseId)
      const sets = Array.from({ length: e.sets }, (_, i) =>
        found?.sets[i] ?? { weight: '', reps: '' }
      )
      return {
        key: e.id,
        exerciseId: e.exerciseId,
        repsTarget: e.repsTarget,
        restSec: e.restSec,
        sets
      }
    })
    setDraft(built)
  }, [session?.id, data.history.length]) // eslint-disable-line

  if (!session) {
    return (
      <div className="fade-in">
        <header className="page-head">
          <div>
            <div className="eyebrow">Live</div>
            <h1>Aucune séance<em>.</em></h1>
          </div>
        </header>
        <div className="empty">Crée d'abord une séance dans Programme.</div>
      </div>
    )
  }

  const totalSets = draft?.reduce((a, e) => a + e.sets.length, 0) ?? 0
  const completedSets = draft?.reduce(
    (a, e) => a + e.sets.filter((s) => s.weight !== '' && s.reps !== '').length,
    0
  ) ?? 0
  const volume = draft?.reduce(
    (a, e) =>
      a +
      e.sets.reduce(
        (b, s) => b + (Number(s.weight) || 0) * (Number(s.reps) || 0),
        0
      ),
    0
  ) ?? 0

  const updateSet = (exoIdx, setIdx, patch) => {
    setDraft((prev) =>
      prev.map((e, i) =>
        i === exoIdx
          ? { ...e, sets: e.sets.map((s, j) => (j === setIdx ? { ...s, ...patch } : s)) }
          : e
      )
    )
  }

  const saveSession = () => {
    const next = updateData((d) => {
      d.history = d.history.filter((h) => !(h.date === date && h.sessionId === session.id))
      d.history.push({
        id: uid('log'),
        date,
        sessionId: session.id,
        // Snapshot du nom au moment du log (résiste à un rename ou une suppression de la séance).
        sessionName: session.name,
        entries: draft.map((e) => ({
          exerciseId: e.exerciseId,
          // Snapshot des cibles programme au moment du log.
          repsTarget: e.repsTarget,
          restSec: e.restSec,
          sets: e.sets.map((s) => ({
            weight: s.weight === '' ? '' : Number(s.weight),
            reps: s.reps === '' ? '' : Number(s.reps)
          }))
        }))
      })
      d.ui = d.ui || {}
      d.ui.activeSessionId = session.id
    })
    setLocal(next)
    setSavedAt(new Date())
  }

  const switchSession = (id) => {
    setActiveSessionId(id)
    const next = updateData((d) => {
      d.ui = d.ui || {}
      d.ui.activeSessionId = id
    })
    setLocal(next)
  }

  return (
    <div className="fade-in">
      <header className="page-head">
        <div>
          <div className="eyebrow">Live · {date}</div>
          <h1>Séance<em>.</em></h1>
        </div>
        <div className="meta">
          <div><strong>{completedSets}/{totalSets}</strong> séries</div>
          <div>Volume · <strong>{Math.round(volume).toLocaleString('fr-FR')} kg</strong></div>
        </div>
      </header>

      {/* Session selector */}
      <div className="session-tabs">
        {data.programme.sessions.map((s, i) => (
          <button
            key={s.id}
            className={`session-tab ${s.id === session.id ? 'active' : ''}`}
            onClick={() => switchSession(s.id)}
          >
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Workout cards */}
      {session.exercises.length === 0 && (
        <div className="empty">Aucun exercice dans cette séance. Ajoute-en dans Programme.</div>
      )}

      {draft && session.exercises.map((e, exoIdx) => {
        const meta = EXERCISES_BY_ID[e.exerciseId]
        const group = GROUP_BY_EXERCISE_ID[e.exerciseId]
        const groupLabel = group?.name ?? '—'
        const last = findLastEntry(
          data.history.filter((h) => !(h.date === date && h.sessionId === session.id)),
          e.exerciseId
        )
        const exoDraft = draft[exoIdx]
        if (!exoDraft) return null

        return (
          <div className="workout-card" key={e.id}>
            <div className="workout-head">
              <div className="left">
                <span className="group">
                  {groupLabel}{meta?.equipment ? ` · ${meta.equipment}` : ''}
                </span>
                <span className="name">{meta?.name ?? 'Exercice'}</span>
              </div>
              <div className="right">
                <span>Cible <b>{exoDraft.repsTarget}</b> reps</span>
                <span>Repos <b>{exoDraft.restSec}s</b></span>
                <span className="tag red">{exoDraft.sets.length} séries</span>
              </div>
            </div>

            <div className="set-grid">
              <div className="set-row head">
                <span className="set-n">SET</span>
                <span className="last h-last">Dernière fois</span>
                <span>Poids (kg)</span>
                <span>Reps</span>
              </div>

              {exoDraft.sets.map((s, setIdx) => {
                const lastSet = last?.entry?.sets?.[setIdx]
                return (
                  <div className="set-row" key={setIdx}>
                    <span className="set-n">{setIdx + 1}</span>
                    <span className="last">
                      {lastSet && (lastSet.weight || lastSet.reps) ? (
                        <>
                          <em>{lastSet.weight || '—'}</em> kg × <em>{lastSet.reps || '—'}</em>
                        </>
                      ) : (
                        <span style={{ opacity: 0.4 }}>—</span>
                      )}
                    </span>
                    <input
                      className="input num"
                      type="number"
                      inputMode="decimal"
                      placeholder={lastSet?.weight ? String(lastSet.weight) : '0'}
                      value={s.weight}
                      onChange={(ev) => updateSet(exoIdx, setIdx, { weight: ev.target.value })}
                    />
                    <input
                      className="input num"
                      type="number"
                      inputMode="numeric"
                      placeholder={lastSet?.reps ? String(lastSet.reps) : String(exoDraft.repsTarget)}
                      value={s.reps}
                      onChange={(ev) => updateSet(exoIdx, setIdx, { reps: ev.target.value })}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Save bar */}
      {session.exercises.length > 0 && (
        <div
          className="card"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            marginTop: 18,
            flexWrap: 'wrap'
          }}
        >
          <div>
            <div className="brand-sub" style={{ marginBottom: 4 }}>État</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13 }}>
              {savedAt
                ? `Sauvegardé à ${savedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
                : 'Modifications non sauvegardées'}
            </div>
          </div>
          <button className="btn primary" onClick={saveSession}>
            Sauvegarder la séance
          </button>
        </div>
      )}
    </div>
  )
}
