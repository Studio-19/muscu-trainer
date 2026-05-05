const STORAGE_KEY = 'forza.muscu.v1'

const defaultData = () => ({
  version: 1,
  programme: {
    id: 'prog-1',
    name: 'Mon Programme',
    sessions: [
      {
        id: 'sess-1',
        name: 'Jour 1 — Push',
        exercises: []
      }
    ]
  },
  history: [],
  ui: {
    activeSessionId: 'sess-1'
  }
})

export function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seed = defaultData()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
      return seed
    }
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return defaultData()
    return parsed
  } catch {
    return defaultData()
  }
}

export function setData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function updateData(mutator) {
  const draft = structuredClone(getData())
  const ret = mutator(draft)
  const next = ret ?? draft
  setData(next)
  return next
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY)
  return getData()
}

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function findLastEntry(history, exerciseId, beforeDate = null) {
  const sorted = [...history].sort((a, b) => (a.date < b.date ? 1 : -1))
  for (const log of sorted) {
    if (beforeDate && log.date >= beforeDate) continue
    const entry = log.entries?.find((e) => e.exerciseId === exerciseId)
    if (entry && entry.sets?.some((s) => s.weight || s.reps)) {
      return { log, entry }
    }
  }
  return null
}

export function bestWeight(history, exerciseId) {
  let best = 0
  for (const log of history) {
    const entry = log.entries?.find((e) => e.exerciseId === exerciseId)
    if (!entry) continue
    for (const set of entry.sets || []) {
      const w = Number(set.weight) || 0
      if (w > best) best = w
    }
  }
  return best
}

export function totalVolume(history, exerciseId) {
  let vol = 0
  for (const log of history) {
    const entry = log.entries?.find((e) => e.exerciseId === exerciseId)
    if (!entry) continue
    for (const set of entry.sets || []) {
      const w = Number(set.weight) || 0
      const r = Number(set.reps) || 0
      vol += w * r
    }
  }
  return vol
}
