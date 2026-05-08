import { muscleGroups, EXERCISES_BY_ID } from './data/exercises.js'

export const PROVIDERS = {
  gemini: {
    label: 'Google Gemini (gratuit avec AI Studio)',
    keyHelp: 'Clé API depuis aistudio.google.com/app/apikey',
    defaultModel: 'gemini-2.5-flash',
    suggestedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash']
  },
  anthropic: {
    label: 'Anthropic Claude (payant)',
    keyHelp: 'Clé API depuis console.anthropic.com',
    defaultModel: 'claude-sonnet-4-6',
    suggestedModels: ['claude-sonnet-4-6', 'claude-haiku-4-5', 'claude-opus-4-7']
  },
  openai: {
    label: 'OpenAI (payant)',
    keyHelp: 'Clé API depuis platform.openai.com',
    defaultModel: 'gpt-4o-mini',
    suggestedModels: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini']
  }
}

// =====================================================================
// Catalog + schema for the AI to respect
// =====================================================================

function buildExerciseCatalog() {
  return muscleGroups.flatMap((g) =>
    g.exercises.map((e) => ({
      id: e.id,
      name: e.name,
      group: g.name,
      equipment: e.equipment,
      type: e.type
    }))
  )
}

const SESSION_JSON_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nom court et descriptif de la séance, ex: "Push pecs/épaules" ou "Jambes hypertrophie"'
    },
    exercises: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          exerciseId: {
            type: 'string',
            description: "ID de l'exercice, doit correspondre EXACTEMENT à un id du catalogue fourni"
          },
          sets: { type: 'integer', description: 'Nombre de séries (ex: 3-5)' },
          repsTarget: { type: 'integer', description: 'Reps cible par série (ex: 6-15)' },
          restSec: { type: 'integer', description: 'Repos en secondes entre séries (ex: 60-180)' }
        },
        required: ['exerciseId', 'sets', 'repsTarget', 'restSec']
      }
    }
  },
  required: ['name', 'exercises']
}

// =====================================================================
// Prompt builders
// =====================================================================

function profileBlock(profile) {
  if (!profile) return 'Profil non renseigné.'
  const lines = []
  if (profile.sexe) lines.push(`Sexe: ${profile.sexe}`)
  if (profile.age) lines.push(`Âge: ${profile.age}`)
  if (profile.taille) lines.push(`Taille: ${profile.taille} cm`)
  if (profile.poids) lines.push(`Poids: ${profile.poids} kg`)
  if (profile.niveau) lines.push(`Niveau: ${profile.niveau}`)
  if (profile.objectif) lines.push(`Objectif: ${profile.objectif}`)
  if (profile.dispos) lines.push(`Disponibilités: ${profile.dispos}`)
  if (profile.materiel) lines.push(`Matériel disponible: ${profile.materiel}`)
  if (profile.notes) lines.push(`Notes: ${profile.notes}`)
  return lines.length ? lines.join('\n') : 'Profil non renseigné.'
}

function compactHistory(history, limit = 10) {
  if (!history?.length) return 'Aucun historique.'
  const recent = [...history]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit)
  return recent
    .map((log) => {
      const entries = (log.entries ?? []).map((e) => {
        const meta = EXERCISES_BY_ID[e.exerciseId]
        const sets = (e.sets ?? [])
          .filter((s) => s.weight || s.reps)
          .map((s) => `${s.weight || 0}kg×${s.reps || 0}`)
          .join(' ')
        return `  - ${meta?.name ?? e.exerciseId}: ${sets || '(vide)'}`
      })
      return `${log.date} — ${log.sessionName ?? 'Séance'}\n${entries.join('\n')}`
    })
    .join('\n\n')
}

function catalogBlock() {
  const cat = buildExerciseCatalog()
  return cat.map((e) => `${e.id} | ${e.group} | ${e.equipment} | ${e.name}`).join('\n')
}

function sessionSystemPrompt(profile) {
  return `Tu es un coach sportif expert en musculation. Tu génères des séances adaptées au profil de l'utilisateur.

PROFIL UTILISATEUR:
${profileBlock(profile)}

CONTRAINTES STRICTES:
- Tu DOIS choisir chaque exerciseId UNIQUEMENT dans le catalogue ci-dessous (format: id | groupe | matériel | nom).
- Ne JAMAIS inventer d'exerciseId qui n'est pas dans le catalogue.
- Ordre logique: gros compounds d'abord, isolations ensuite.
- 4-8 exercices par séance selon la durée demandée.
- Adapte volume/intensité au niveau et à l'objectif.

CATALOGUE D'EXERCICES DISPONIBLES:
${catalogBlock()}

Réponds UNIQUEMENT en JSON valide respectant le schéma demandé. Aucun texte hors JSON.`
}

function analysisSystemPrompt(profile) {
  return `Tu es un coach sportif expert en musculation. Tu analyses l'historique d'entraînement de l'utilisateur et donnes un retour franc, actionnable et encourageant.

PROFIL UTILISATEUR:
${profileBlock(profile)}

CONSIGNES:
- Identifie les progressions, plateaux, déséquilibres muscle/groupe.
- Donne 3 à 5 recommandations concrètes (exercices à ajouter, charge à monter, fréquence, etc.).
- Style: direct, structuré en markdown (titres ##, listes -). Pas de blabla.
- Réponse en français.`
}

// =====================================================================
// Provider implementations — generate JSON for a session
// =====================================================================

async function geminiGenerate({ apiKey, model, systemPrompt, userPrompt, jsonSchema }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: jsonSchema
      ? { responseMimeType: 'application/json', responseSchema: jsonSchema, temperature: 0.7 }
      : { temperature: 0.7 }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gemini ${res.status}: ${text}`)
  }
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? ''
  if (!text) throw new Error('Réponse Gemini vide')
  return text
}

async function anthropicGenerate({ apiKey, model, systemPrompt, userPrompt, jsonSchema }) {
  const url = 'https://api.anthropic.com/v1/messages'
  const body = {
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  }
  if (jsonSchema) {
    body.tools = [
      {
        name: 'create_session',
        description: 'Génère une séance de musculation au format demandé',
        input_schema: jsonSchema
      }
    ]
    body.tool_choice = { type: 'tool', name: 'create_session' }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Anthropic ${res.status}: ${text}`)
  }
  const data = await res.json()

  if (jsonSchema) {
    const toolUse = data.content?.find((c) => c.type === 'tool_use')
    if (!toolUse) throw new Error('Anthropic: pas de tool_use dans la réponse')
    return JSON.stringify(toolUse.input)
  }
  const text = data.content?.filter((c) => c.type === 'text').map((c) => c.text).join('') ?? ''
  if (!text) throw new Error('Réponse Anthropic vide')
  return text
}

async function openaiGenerate({ apiKey, model, systemPrompt, userPrompt, jsonSchema }) {
  const url = 'https://api.openai.com/v1/chat/completions'
  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7
  }
  if (jsonSchema) {
    body.response_format = {
      type: 'json_schema',
      json_schema: {
        name: 'session',
        strict: true,
        schema: openaiStrictSchema(jsonSchema)
      }
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenAI ${res.status}: ${text}`)
  }
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content ?? ''
  if (!text) throw new Error('Réponse OpenAI vide')
  return text
}

// OpenAI strict mode requires additionalProperties:false on every object
// and all properties listed in `required`.
function openaiStrictSchema(schema) {
  if (!schema || typeof schema !== 'object') return schema
  if (schema.type === 'object') {
    const props = schema.properties ?? {}
    return {
      ...schema,
      additionalProperties: false,
      required: Object.keys(props),
      properties: Object.fromEntries(
        Object.entries(props).map(([k, v]) => [k, openaiStrictSchema(v)])
      )
    }
  }
  if (schema.type === 'array' && schema.items) {
    return { ...schema, items: openaiStrictSchema(schema.items) }
  }
  return schema
}

// =====================================================================
// Dispatcher
// =====================================================================

async function callProvider({ aiConfig, systemPrompt, userPrompt, jsonSchema }) {
  if (!aiConfig?.apiKey) throw new Error('Clé API manquante. Renseigne-la dans Réglages.')
  const model = aiConfig.model || PROVIDERS[aiConfig.provider]?.defaultModel
  if (!model) throw new Error('Modèle non défini.')

  const args = { apiKey: aiConfig.apiKey, model, systemPrompt, userPrompt, jsonSchema }
  switch (aiConfig.provider) {
    case 'gemini':
      return geminiGenerate(args)
    case 'anthropic':
      return anthropicGenerate(args)
    case 'openai':
      return openaiGenerate(args)
    default:
      throw new Error(`Provider inconnu: ${aiConfig.provider}`)
  }
}

// =====================================================================
// Public API
// =====================================================================

export async function generateSession({ aiConfig, profile, prompt }) {
  if (!prompt?.trim()) throw new Error('Décris la séance que tu veux.')

  const raw = await callProvider({
    aiConfig,
    systemPrompt: sessionSystemPrompt(profile),
    userPrompt: prompt,
    jsonSchema: SESSION_JSON_SCHEMA
  })

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (err) {
    throw new Error(`JSON invalide reçu de l'IA. Réessaie.\n${raw.slice(0, 200)}`)
  }

  // Validate exercise IDs against catalog. Drop invalids and report.
  const validExercises = []
  const invalidIds = []
  for (const e of parsed.exercises ?? []) {
    if (EXERCISES_BY_ID[e.exerciseId]) {
      validExercises.push({
        exerciseId: e.exerciseId,
        sets: clampInt(e.sets, 1, 20, 4),
        repsTarget: clampInt(e.repsTarget, 1, 100, 8),
        restSec: clampInt(e.restSec, 0, 600, 90)
      })
    } else {
      invalidIds.push(e.exerciseId)
    }
  }

  if (validExercises.length === 0) {
    throw new Error(
      `L'IA n'a renvoyé aucun exercice valide. IDs rejetés: ${invalidIds.join(', ') || '—'}`
    )
  }

  return {
    name: String(parsed.name || 'Séance générée').slice(0, 80),
    exercises: validExercises,
    invalidIds
  }
}

export async function analyzeHistory({ aiConfig, profile, history }) {
  const userPrompt = `Voici mes ${Math.min(history?.length ?? 0, 10)} dernières séances:\n\n${compactHistory(
    history,
    10
  )}\n\nFais-moi un retour de coach.`

  return callProvider({
    aiConfig,
    systemPrompt: analysisSystemPrompt(profile),
    userPrompt,
    jsonSchema: null
  })
}

function clampInt(v, min, max, fallback) {
  const n = parseInt(v, 10)
  if (Number.isNaN(n)) return fallback
  return Math.max(min, Math.min(max, n))
}
