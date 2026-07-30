export type SleepLogEntry = {
  date: string
  bedTime: string
  wakeTime: string
  quality: number
  durationMinutes: number
  score: number
}

const STORAGE_KEY = 'pogeun.sleepLogs'

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function sleepDurationMinutes(bedTime: string, wakeTime: string): number {
  const bed = toMinutes(bedTime)
  let wake = toMinutes(wakeTime)
  if (wake <= bed) wake += 24 * 60
  return wake - bed
}

export function calculateSleepScore(durationMinutes: number, quality: number): number {
  const idealMin = 420
  const idealMax = 540

  let durationScore: number
  if (durationMinutes < idealMin) {
    durationScore = 70 - (idealMin - durationMinutes) / 6
  } else if (durationMinutes > idealMax) {
    durationScore = 70 - (durationMinutes - idealMax) / 8
  } else {
    durationScore = 70
  }
  durationScore = Math.max(0, Math.min(70, durationScore))

  const qualityScore = (quality / 5) * 30

  return Math.round(Math.max(0, Math.min(100, durationScore + qualityScore)))
}

export function getTodayDate(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(dateStr: string, delta: number): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + delta)
  const yy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

export function calculateStreak(entries: SleepLogEntry[]): number {
  if (entries.length === 0) return 0

  const dateSet = new Set(entries.map((e) => e.date))
  const today = getTodayDate()
  const yesterday = addDays(today, -1)

  let cursor: string
  if (dateSet.has(today)) {
    cursor = today
  } else if (dateSet.has(yesterday)) {
    cursor = yesterday
  } else {
    return 0
  }

  let streak = 0
  while (dateSet.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function formatDateLabel(dateStr: string): string {
  const [, m, d] = dateStr.split('-').map(Number)
  return `${m}월 ${d}일`
}

export function formatShortDate(dateStr: string): string {
  const [, m, d] = dateStr.split('-').map(Number)
  return `${m}/${d}`
}

export function formatClockTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours < 12 ? '오전' : '오후'
  let hours12 = hours % 12
  if (hours12 === 0) hours12 = 12
  return `${period} ${hours12}:${String(minutes).padStart(2, '0')}`
}

export function loadSleepLogs(): SleepLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function saveSleepLogs(entries: SleepLogEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // 저장 공간이 없거나 접근이 막힌 환경(시크릿 모드 등)에서는 조용히 무시
  }
}

export function addSleepLog(bedTime: string, wakeTime: string, quality: number): SleepLogEntry {
  const durationMinutes = sleepDurationMinutes(bedTime, wakeTime)
  const score = calculateSleepScore(durationMinutes, quality)
  const entry: SleepLogEntry = {
    date: getTodayDate(),
    bedTime,
    wakeTime,
    quality,
    durationMinutes,
    score,
  }

  const withoutToday = loadSleepLogs().filter((e) => e.date !== entry.date)
  const updated = [...withoutToday, entry].sort((a, b) => a.date.localeCompare(b.date))
  saveSleepLogs(updated)

  return entry
}
