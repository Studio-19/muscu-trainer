import { useEffect, useMemo, useState } from 'react'
import { getData, updateData, uid } from '../storage.js'
import { muscleGroups, EXERCISES_BY_ID, GROUP_BY_EXERCISE_ID } from '../data/exercises.js'

export default function Programme() {
  const [data, setData] = useState(getData())
  const [activeSessionId, setActiveSessionId] = useState(
    data.ui?.activeSessionId ?? data.programme.sessions[0]?.id ?? null
  )
  // selectedGroupIds = filtre UI multi-groupes (chips). Jamais stocké sur la séance.
  const [selectedGroupIds, setSelectedGroupIds] = useState([muscleGroups[0].id])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')

  const toggleGroup = (id) => {
    setSelectedGroupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }
  const selectAllGroups = () => setSelectedGroupIds(muscleGroups.map((g) => g.id))
  const clearGroups = () => setSelectedGroupIds([])

  // Aplati les exos des groupes sélectionnés. Ordre = ordre des groupes dans data.
  const exercisesForGroups = useMemo(() => {
    const active = selectedGroupIds.length === 0 ? muscleGroups : muscleGroups.filter((g) => selectedGroupIds.includes(g.id))
    return active.flatMap((g) => g.exercises)
  }, [selectedGroupIds])

  useEffect(() => {
    setSelectedExerciseId((current) => {
      if (current && exercisesForGroups.some((e) => e.id === current)) return current
      return exercisesForGroups[0]?.id ?? ''
    })
  }, [exercisesForGroups])

  const programme = data.programme
  const sessions = programme?.sessions ?? []
  const session = sessions.find((s) => s.id === activeSessionId) ?? null

  // ----- Persist wrapper: mutate localStorage draft + sync React state -----
  const persist = (mutator) => {
    const next = updateData(mutator)
    setData(next)
    return next
  }

  // ----- Programme name -----
  const handleRenameProgramme = (name) =>
    persist((draft) => {
      if (!draft.programme) draft.programme = { id: 'default', name: '', sessions: [] }
      draft.programme.name = name
    })

  // ----- Sessions -----
  const handleAddSession = () => {
    const next = persist((draft) => {
      if (!draft.programme) {
        draft.programme = { id: 'default', name: 'Mon programme', sessions: [] }
      }
      if (!draft.programme.sessions) draft.programme.sessions = []
      const index = draft.programme.sessions.length + 1
      const newSession = {
        id: uid('sess'),
        name: `Jour ${index} — Nouvelle séance`,
        exercises: []
      }
      draft.programme.sessions.push(newSession)
      draft.ui = draft.ui || {}
      draft.ui.activeSessionId = newSession.id
    })
    const created = next.programme.sessions.at(-1)
    if (created) setActiveSessionId(created.id)
  }

  const handleRenameSession = (sessionId, name) =>
    persist((draft) => {
      const s = draft.programme.sessions.find((x) => x.id === sessionId)
      if (s) s.name = name
    })

  const handleDeleteSession = (sessionId) => {
    if (!window.confirm('Supprimer cette séance ?')) return

    const next = persist((draft) => {
      if (!draft.programme?.sessions) return

      // Supprimer la séance du programme uniquement.
      draft.programme.sessions = draft.programme.sessions.filter(
        (s) => s.id !== sessionId
      )

      // Mettre à jour la séance active si nécessaire.
      if (draft.ui?.activeSessionId === sessionId) {
        const first = draft.programme.sessions[0]
        draft.ui = draft.ui || {}
        draft.ui.activeSessionId = first ? first.id : null
      }

      // NE PAS toucher à draft.history : on garde l'historique.
    })

    // Sync React state pour la séance active locale.
    if (sessionId === activeSessionId) {
      const first = next.programme.sessions[0]
      setActiveSessionId(first ? first.id : null)
    }
  }

  // ----- Exercises in active session -----
  const handleAddExercise = () => {
    if (!selectedExerciseId || !session) return
    persist((draft) => {
      const s = draft.programme.sessions.find((x) => x.id === session.id)
      if (!s) return
      s.exercises.push({
        id: uid('ex'),
        exerciseId: selectedExerciseId,
        sets: 4,
        repsTarget: 8,
        restSec: 90
      })
    })
  }

  const handleUpdateExo = (exoId, patch) => {
    if (!session) return
    persist((draft) => {
      const s = draft.programme.sessions.find((x) => x.id === session.id)
      const e = s?.exercises.find((x) => x.id === exoId)
      if (e) Object.assign(e, patch)
    })
  }

  const handleRemoveExo = (exoId) => {
    if (!session) return
    persist((draft) => {
      const s = draft.programme.sessions.find((x) => x.id === session.id)
      if (s) s.exercises = s.exercises.filter((x) => x.id !== exoId)
    })
  }

  return (
    <div className="fade-in">
      <header className="page-head">
        <div>
          <div className="eyebrow">Configuration</div>
          <h1>Programme<em>.</em></h1>
        </div>
        <div className="meta">
          <div>
            <strong>{sessions.length}</strong> séance{sessions.length > 1 ? 's' : ''}
          </div>
          <div>
            Total exos · <strong>{sessions.reduce((a, s) => a + s.exercises.length, 0)}</strong>
          </div>
        </div>
      </header>

      {/* Programme name + actions */}
      <div className="card accent" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="field" style={{ flex: '1 1 280px' }}>
            <label>Nom du programme</label>
            <input
              className="input"
              value={programme?.name ?? ''}
              onChange={(e) => handleRenameProgramme(e.target.value)}
            />
          </div>
          <button type="button" className="btn primary" onClick={handleAddSession}>
            + Ajouter une séance
          </button>
        </div>
      </div>

      {/* Session tabs */}
      {sessions.length > 0 && (
        <div className="session-tabs">
          {sessions.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`session-tab ${s.id === session?.id ? 'active' : ''}`}
              onClick={() => setActiveSessionId(s.id)}
            >
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Empty state when no sessions */}
      {sessions.length === 0 && (
        <div className="empty">
          Aucune séance dans ce programme. Clique sur « + Ajouter une séance » pour commencer.
        </div>
      )}

      {/* Session editor (only when a session is active) */}
      {session && (
        <div className="card">
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-end',
              marginBottom: 16,
              flexWrap: 'wrap'
            }}
          >
            <div className="field" style={{ flex: '1 1 260px' }}>
              <label>Nom de la séance</label>
              <input
                className="input"
                value={session.name}
                onChange={(e) => handleRenameSession(session.id, e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn danger"
              onClick={() => handleDeleteSession(session.id)}
            >
              Supprimer la séance
            </button>
          </div>

          {/* Exercise rows */}
          {session.exercises.length === 0 ? (
            <div className="empty">Aucun exercice. Ajoute-en en bas.</div>
          ) : (
            <div className="exo-list">
              {session.exercises.map((e) => {
                const meta = EXERCISES_BY_ID[e.exerciseId]
                const group = GROUP_BY_EXERCISE_ID[e.exerciseId]
                return (
                  <div key={e.id} className="exo-item">
                    <div className="name">
                      <span className="label">
                        {group?.name ?? '—'}
                        {meta?.equipment ? ` · ${meta.equipment}` : ''}
                      </span>
                      <span className="title">{meta?.name ?? 'Exercice inconnu'}</span>
                    </div>
                    <div className="field">
                      <label>Séries</label>
                      <input
                        className="input num"
                        type="number"
                        min="1"
                        value={e.sets}
                        onChange={(ev) =>
                          handleUpdateExo(e.id, { sets: clampInt(ev.target.value, 1, 20) })
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Reps cible</label>
                      <input
                        className="input num"
                        type="number"
                        min="1"
                        value={e.repsTarget}
                        onChange={(ev) =>
                          handleUpdateExo(e.id, { repsTarget: clampInt(ev.target.value, 1, 100) })
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Repos (s)</label>
                      <input
                        className="input num"
                        type="number"
                        min="0"
                        step="15"
                        value={e.restSec}
                        onChange={(ev) =>
                          handleUpdateExo(e.id, { restSec: clampInt(ev.target.value, 0, 600) })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => handleRemoveExo(e.id)}
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Add exo: multi-group filter chips */}
          <div className="add-exo-block">
            <div className="add-exo-chips-head">
              <label className="chips-label">Filtrer par groupes musculaires</label>
              <div className="chips-actions">
                <button type="button" className="link-btn" onClick={selectAllGroups}>Tous</button>
                <span className="link-sep">·</span>
                <button type="button" className="link-btn" onClick={clearGroups}>Aucun</button>
              </div>
            </div>

            <div className="group-chips">
              {muscleGroups.map((g) => {
                const active = selectedGroupIds.includes(g.id)
                return (
                  <button
                    key={g.id}
                    type="button"
                    className={`group-chip ${active ? 'active' : ''}`}
                    onClick={() => toggleGroup(g.id)}
                  >
                    {g.name}
                    <span className="count">{g.exercises.length}</span>
                  </button>
                )
              })}
            </div>

            <div className="add-exo">
              <div className="field" style={{ flex: '1 1 320px' }}>
                <label>Exercice ({exercisesForGroups.length})</label>
                <select
                  className="select"
                  value={selectedExerciseId}
                  onChange={(e) => setSelectedExerciseId(e.target.value)}
                  disabled={exercisesForGroups.length === 0}
                >
                  {exercisesForGroups.length === 0 && (
                    <option value="">Sélectionne au moins un groupe</option>
                  )}
                  {exercisesForGroups.map((ex) => {
                    const g = GROUP_BY_EXERCISE_ID[ex.id]
                    return (
                      <option key={ex.id} value={ex.id}>
                        {selectedGroupIds.length !== 1 && g ? `${g.name} — ` : ''}
                        {ex.name} · {ex.equipment}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button
                type="button"
                className="btn primary"
                onClick={handleAddExercise}
                disabled={!selectedExerciseId}
              >
                + Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function clampInt(v, min, max) {
  const n = parseInt(v, 10)
  if (Number.isNaN(n)) return min
  return Math.max(min, Math.min(max, n))
}
