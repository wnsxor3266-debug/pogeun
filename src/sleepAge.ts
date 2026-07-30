export type SleepAnswers = {
  bedTime: string
  wakeTime: string
  fallAsleepMinutes: number
  wakeCount: number
  fatigue: number
}

export type SleepResult = {
  age: number
  durationMinutes: number
  tips: string[]
}

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

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  return mins === 0 ? `${hours}시간` : `${hours}시간 ${mins}분`
}

function durationTip(durationMinutes: number): string {
  if (durationMinutes < 6 * 60) {
    return '평소보다 조금 더 일찍 잠자리에 들어 수면 시간을 7시간 이상으로 늘려보는 것을 권장해요.'
  }
  if (durationMinutes > 9 * 60) {
    return '권장 범위보다 수면 시간이 긴 편이에요. 기상 시간을 조금 앞당겨 7~9시간 사이로 맞춰보는 것을 권장해요.'
  }
  return '지금처럼 7~9시간대의 수면 시간을 꾸준히 유지하는 걸 권장해요.'
}

function latencyTip(fallAsleepMinutes: number): string {
  if (fallAsleepMinutes >= 30) {
    return '잠드는 데 시간이 다소 걸리는 편이에요. 취침 30분 전부터 스마트폰·TV 화면 노출을 줄이고 조명을 낮춰보는 것을 권장해요.'
  }
  if (fallAsleepMinutes >= 15) {
    return '취침 전 가벼운 스트레칭이나 심호흡으로 몸과 마음을 이완하는 루틴을 만들어보면 도움이 될 수 있어요.'
  }
  return '비교적 빠르게 잠드는 편이에요. 지금의 취침 전 루틴을 그대로 유지해보세요.'
}

function wakingTip(wakeCount: number): string {
  if (wakeCount >= 3) {
    return '밤중에 자주 깨는 편이에요. 오후 2시 이후 카페인 섭취를 피하고 취침 전 음주를 줄이면 도움이 될 수 있어요.'
  }
  if (wakeCount >= 1) {
    return '침실 온도는 18~20도 내외로 서늘하게, 조명은 최대한 어둡게 유지하는 것을 권장해요.'
  }
  return '밤중 각성이 적은 편이에요. 지금의 침실 환경을 잘 유지해보세요.'
}

function fatigueTip(fatigue: number): string {
  if (fatigue >= 4) {
    return '낮 동안 피로가 큰 편이에요. 기상 후 15~30분 이내 햇빛을 쬐면 낮 시간 각성 리듬을 조절하는 데 도움이 될 수 있어요.'
  }
  if (fatigue === 3) {
    return '낮잠을 잔다면 20분 이내로 짧게 자는 것이 밤 수면에 미치는 영향을 줄이는 데 도움이 될 수 있어요.'
  }
  return '낮 컨디션이 좋은 편이에요. 지금의 생활 리듬을 유지해보세요.'
}

const CONSISTENCY_TIP =
  '주말과 평일 구분 없이 비슷한 시각에 자고 일어나는 루틴을 유지하는 것을 권장해요.'

export function calculateSleepAge(answers: SleepAnswers): SleepResult {
  const durationMinutes = sleepDurationMinutes(answers.bedTime, answers.wakeTime)
  const idealMinutes = 7.5 * 60

  const durationPenalty = Math.abs(durationMinutes - idealMinutes) / 12
  const latencyPenalty = Math.max(0, answers.fallAsleepMinutes - 15) / 4
  const wakingPenalty = answers.wakeCount * 3.5
  const fatiguePenalty = (answers.fatigue - 1) * 3.5

  const rawAge = 19 + durationPenalty + latencyPenalty + wakingPenalty + fatiguePenalty
  const age = Math.min(80, Math.max(18, Math.round(rawAge)))

  const tips = [
    durationTip(durationMinutes),
    latencyTip(answers.fallAsleepMinutes),
    wakingTip(answers.wakeCount),
    fatigueTip(answers.fatigue),
    CONSISTENCY_TIP,
  ]

  return { age, durationMinutes, tips }
}
