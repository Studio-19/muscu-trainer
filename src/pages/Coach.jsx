import { useState } from 'react'
import { getData, updateData, setProfile, setAiConfig, uid } from '../storage.js'
import { EXERCISES_BY_ID, GROUP_BY_EXERCISE_ID } from '../data/exercises.js'
import { generateSession, analyzeHistory, PROVIDERS } from '../ai.js'

export default function Coach() {
  const [data, setLocal] = useState(getData())

  const [profile, setLocalProfile] = useState(data.profile)
  const [aiConfig, setLocalAiConfig] = useState(data.aiConfig)

  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState(null)
  const [generated, setGenerated] = useState(null)

  const [analyzing, setAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  const [savedFlash, setSavedFlash] = useState(false)

  const provider = PROVIDERS[aiConfig.provider] ?? PROVIDERS.gemini

  const handleSaveSettings = () => {
    setProfile(profile)
    setAiConfig(aiConfig)
    setLocal(getData())
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
  }

  const handleProviderChange = (next) => {
    setLocalAiConfig({
      ...aiConfig,
      provider: next,
      model: PROVIDERS[next]?.defaultModel ?? ''
    })
  }

  const handleGenerate = async () => {
    setGenError(null)
    setGenerated(null)
    setGenerating(true)
    try {
      const result = await generateSession({ aiConfig, profile, prompt })
      setGenerated(result)
    } catch (err) {
      setGenError(err.message || String(err))
    } finally {
      setGenerating(false)
    }
  }

  const handleAddToProgramme = () => {
    if (!generated) return
    const next = updateData((draft) => {
      if (!draft.programme) draft.programme = { id: 'prog-1', name: 'Mon programme', sessions: [] }
      if (!draft.programme.sessions) draft.programme.sessions = []
      const newSession = {
        id: uid('sess'),
        name: generated.name,
        exercises: generated.exercises.map((e) => ({
          id: uid('ex'),
          exerciseId: e.exerciseId,
          sets: e.sets,
          repsTarget: e.repsTarget,
          restSec: e.restSec
        }))
      }
      draft.programme.sessions.push(newSession)
      draft.ui = draft.ui || {}
      draft.ui.activeSessionId = newSession.id
    })
    setLocal(next)
    setGenerated(null)
    setPrompt('')
  }

  const handleAnalyze = async () => {
    setAnalysisError(null)
    setAnalysis(null)
    setAnalyzing(true)
    try {
      const text = await analyzeHistory({
        aiConfig,
        profile,
        history: data.history ?? []
      })
      setAnalysis(text)
    } catch (err) {
      setAnalysisError(err.message || String(err))
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="fade-in">
      <header className="page-head">
        <div>
          <div className="eyebrow">Assistant IA</div>
          <h1>Coach<em>.</em></h1>
        </div>
        <div className="meta">
          <div>Provider · <strong>{provider.label.split(' ')[0]}</strong></div>
          <div>Historique · <strong>{(data.history ?? []).length}</strong></div>
        </div>
      </header>

      {/* ============ Réglages ============ */}
      <div className="card accent" style={{ marginBottom: 22 }}>
        <div className="sect-head" style={{ marginTop: 0 }}>
          <div className="title">Réglages</div>
          <div className="sub">Provider, clé API et profil</div>
        </div>

        <div className="coach-grid">
          <div className="field">
            <label>Provider IA</label>
            <select
              className="select"
              value={aiConfig.provider}
              onChange={(e) => handleProviderChange(e.target.value)}
            >
              {Object.entries(PROVIDERS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Modèle</label>
            <input
              className="input"
              list={`models-${aiConfig.provider}`}
              value={aiConfig.model}
              onChange={(e) => setLocalAiConfig({ ...aiConfig, model: e.target.value })}
              placeholder={provider.defaultModel}
            />
            <datalist id={`models-${aiConfig.provider}`}>
              {provider.suggestedModels.map((m) => <option key={m} value={m} />)}
            </datalist>
          </div>

          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Clé API <span className="hint">— {provider.keyHelp}</span></label>
            <input
              className="input"
              type="password"
              value={aiConfig.apiKey}
              onChange={(e) => setLocalAiConfig({ ...aiConfig, apiKey: e.target.value })}
              placeholder="Colle ta clé ici"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="sect-head">
          <div className="title">Profil</div>
          <div className="sub">Sert à personnaliser les séances générées</div>
        </div>

        <div className="coach-grid">
          <div className="field">
            <label>Sexe</label>
            <select
              className="select"
              value={profile.sexe}
              onChange={(e) => setLocalProfile({ ...profile, sexe: e.target.value })}
            >
              <option value="">—</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div className="field">
            <label>Âge</label>
            <input
              className="input"
              type="number"
              value={profile.age}
              onChange={(e) => setLocalProfile({ ...profile, age: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Taille (cm)</label>
            <input
              className="input"
              type="number"
              value={profile.taille}
              onChange={(e) => setLocalProfile({ ...profile, taille: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Poids (kg)</label>
            <input
              className="input"
              type="number"
              value={profile.poids}
              onChange={(e) => setLocalProfile({ ...profile, poids: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Niveau</label>
            <select
              className="select"
              value={profile.niveau}
              onChange={(e) => setLocalProfile({ ...profile, niveau: e.target.value })}
            >
              <option value="">—</option>
              <option value="débutant">Débutant (&lt; 1 an)</option>
              <option value="intermédiaire">Intermédiaire (1-3 ans)</option>
              <option value="avancé">Avancé (3+ ans)</option>
            </select>
          </div>
          <div className="field">
            <label>Objectif</label>
            <select
              className="select"
              value={profile.objectif}
              onChange={(e) => setLocalProfile({ ...profile, objectif: e.target.value })}
            >
              <option value="">—</option>
              <option value="hypertrophie">Hypertrophie</option>
              <option value="force">Force</option>
              <option value="endurance">Endurance</option>
              <option value="perte de gras">Perte de gras</option>
              <option value="prise de masse">Prise de masse</option>
            </select>
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Disponibilités</label>
            <input
              className="input"
              value={profile.dispos}
              onChange={(e) => setLocalProfile({ ...profile, dispos: e.target.value })}
              placeholder="Ex: 4 séances/semaine, 60-75 min"
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Matériel disponible</label>
            <input
              className="input"
              value={profile.materiel}
              onChange={(e) => setLocalProfile({ ...profile, materiel: e.target.value })}
              placeholder="Ex: salle complète / barre + haltères + banc / poids de corps uniquement"
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Notes (blessures, contraintes…)</label>
            <textarea
              className="input"
              rows={2}
              value={profile.notes}
              onChange={(e) => setLocalProfile({ ...profile, notes: e.target.value })}
              placeholder="Ex: épaule gauche fragile, pas de soulevé de terre lourd"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center' }}>
          <button type="button" className="btn primary" onClick={handleSaveSettings}>
            Sauvegarder
          </button>
          {savedFlash && <span className="hint" style={{ color: 'var(--c-good)' }}>Enregistré ✓</span>}
        </div>
      </div>

      {/* ============ Génération de séance ============ */}
      <div className="card" style={{ marginBottom: 22 }}>
        <div className="sect-head" style={{ marginTop: 0 }}>
          <div className="title">Générer une séance</div>
          <div className="sub">Décris ce que tu veux, l'IA respecte ton profil et le catalogue d'exos</div>
        </div>

        <div className="field" style={{ marginBottom: 12 }}>
          <label>Demande</label>
          <textarea
            className="input"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Push 60 min focus pecs, peu de matériel à part barre et haltères"
          />
        </div>

        <button
          type="button"
          className="btn primary"
          onClick={handleGenerate}
          disabled={generating || !aiConfig.apiKey || !prompt.trim()}
        >
          {generating ? 'Génération…' : '✨ Générer'}
        </button>

        {genError && <div className="alert error" style={{ marginTop: 12 }}>{genError}</div>}

        {generated && (
          <div className="generated-block">
            <div className="generated-head">
              <div className="ex-name">{generated.name}</div>
              <div className="group-tag">
                {generated.exercises.length} exo{generated.exercises.length > 1 ? 's' : ''}
                {generated.invalidIds?.length > 0 && ` · ${generated.invalidIds.length} rejeté(s)`}
              </div>
            </div>
            <div className="exo-detail-list">
              {generated.exercises.map((e, i) => {
                const meta = EXERCISES_BY_ID[e.exerciseId]
                const group = GROUP_BY_EXERCISE_ID[e.exerciseId]
                return (
                  <div key={i} className="exo-detail">
                    <div className="exo-detail-meta">
                      {[group?.name, meta?.equipment].filter(Boolean).join(' · ')}
                      {' · '}cible {e.repsTarget} reps · repos {e.restSec}s
                    </div>
                    <div className="exo-detail-name">{meta?.name ?? e.exerciseId}</div>
                    <div className="exo-sets">
                      <span className="exo-set">
                        <span className="set-i">×</span>
                        {e.sets} séries
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button type="button" className="btn primary" onClick={handleAddToProgramme}>
                + Ajouter au programme
              </button>
              <button type="button" className="btn ghost" onClick={() => setGenerated(null)}>
                Rejeter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============ Analyse historique ============ */}
      <div className="card">
        <div className="sect-head" style={{ marginTop: 0 }}>
          <div className="title">Analyse de mon historique</div>
          <div className="sub">Retour de coach sur tes 10 dernières séances</div>
        </div>

        <button
          type="button"
          className="btn primary"
          onClick={handleAnalyze}
          disabled={analyzing || !aiConfig.apiKey || (data.history ?? []).length === 0}
        >
          {analyzing ? 'Analyse…' : '🔎 Analyser'}
        </button>

        {(data.history ?? []).length === 0 && (
          <div className="hint" style={{ marginTop: 10 }}>
            Aucune séance dans l'historique pour l'instant.
          </div>
        )}

        {analysisError && <div className="alert error" style={{ marginTop: 12 }}>{analysisError}</div>}

        {analysis && (
          <div className="analysis-block">
            <MarkdownLite text={analysis} />
          </div>
        )}
      </div>
    </div>
  )
}

// =====================================================================
// Tiny markdown renderer (headings, lists, bold, paragraphs)
// =====================================================================

function MarkdownLite({ text }) {
  const lines = text.split('\n')
  const out = []
  let listBuf = []

  const flushList = () => {
    if (listBuf.length) {
      out.push(
        <ul key={`ul-${out.length}`}>
          {listBuf.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      )
      listBuf = []
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (/^\s*[-*]\s+/.test(line)) {
      listBuf.push(line.replace(/^\s*[-*]\s+/, ''))
      continue
    }
    flushList()
    if (!line.trim()) continue
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      const level = Math.min(h[1].length + 1, 6) // ## → h3
      const Tag = `h${level}`
      out.push(<Tag key={out.length}>{renderInline(h[2])}</Tag>)
      continue
    }
    out.push(<p key={out.length}>{renderInline(line)}</p>)
  }
  flushList()
  return <div className="md">{out}</div>
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  )
}
