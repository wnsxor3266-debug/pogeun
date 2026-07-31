import type { SleepLogEntry } from './sleepLog'

export type PersonalizedRecommendation = {
  hook: string
  productIds: string[]
}

const RECENT_ENTRY_COUNT = 7
const SHORT_SLEEP_MINUTES = 390

/**
 * 최근 수면 기록을 바탕으로 가장 두드러진 패턴 하나를 골라 관련 제품을 추천해요.
 * 패턴이 뚜렷하지 않거나 기록이 너무 적으면(과한 추천을 막기 위해) null을 돌려줘요.
 */
export function getPersonalizedRecommendation(entries: SleepLogEntry[]): PersonalizedRecommendation | null {
  const recent = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, RECENT_ENTRY_COUNT)
  if (recent.length < 2) return null

  const tossCount = recent.filter((e) => e.quality === 1).length
  const wakeCount = recent.filter((e) => e.quality === 2).length
  const shortCount = recent.filter((e) => e.durationMinutes < SHORT_SLEEP_MINUTES).length

  const candidates = [
    { count: tossCount, hook: '잠들기 힘든 밤엔', productIds: ['aroma-diffuser', 'sleep-tea'] },
    { count: wakeCount, hook: '자주 깨는 밤엔', productIds: ['white-noise', 'eye-mask'] },
    { count: shortCount, hook: '더 편안한 잠자리를 위해', productIds: ['memory-foam-pillow'] },
  ]

  const top = candidates.reduce((best, current) => (current.count > best.count ? current : best))
  const threshold = Math.max(2, Math.ceil(recent.length / 2))
  if (top.count < threshold) return null

  return { hook: top.hook, productIds: top.productIds }
}
