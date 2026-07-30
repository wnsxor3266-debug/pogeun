export type ReminderSettings = {
  time: string
  enabled: boolean
}

const STORAGE_KEY = 'pogeun.bedtimeReminder'
const DEFAULT_SETTINGS: ReminderSettings = { time: '23:00', enabled: false }

export function loadReminderSettings(): ReminderSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw)
    if (typeof parsed?.time !== 'string' || typeof parsed?.enabled !== 'boolean') return DEFAULT_SETTINGS
    return parsed
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveReminderSettings(settings: ReminderSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // 저장 공간이 없거나 접근이 막힌 환경(시크릿 모드 등)에서는 조용히 무시
  }
}

export function millisecondsUntil(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  const now = new Date()
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0)
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1)
  }
  return target.getTime() - now.getTime()
}
