const CYCLE_MINUTES = 90
const FALL_ASLEEP_MINUTES = 15
const CYCLE_COUNTS = [3, 4, 5, 6]

export type CycleOption = {
  cycles: number
  timeLabel: string
  durationLabel: string
  stars: number
  recommended: boolean
}

function toMinutesOfDay(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function nowMinutesOfDay(): number {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

function formatTimeLabel(minuteOfDayRaw: number): string {
  const minuteOfDay = ((minuteOfDayRaw % 1440) + 1440) % 1440
  const hours24 = Math.floor(minuteOfDay / 60)
  const minutes = minuteOfDay % 60
  const period = hours24 < 12 ? '오전' : '오후'
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12
  return `${period} ${hours12}:${String(minutes).padStart(2, '0')}`
}

function formatCycleDuration(cycles: number): string {
  const totalMinutes = cycles * CYCLE_MINUTES
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const durationLabel = minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`
  return `${cycles}주기 · ${durationLabel}`
}

function rateCycles(cycles: number): number {
  if (cycles >= 5) return 3
  if (cycles === 4) return 2
  return 1
}

function buildOptions(baseMinuteOfDay: number, direction: 1 | -1): CycleOption[] {
  return CYCLE_COUNTS.map((cycles) => ({
    cycles,
    timeLabel: formatTimeLabel(baseMinuteOfDay + direction * cycles * CYCLE_MINUTES),
    durationLabel: formatCycleDuration(cycles),
    stars: rateCycles(cycles),
    recommended: cycles >= 5,
  }))
}

export function getWakeOptionsFromNow(): CycleOption[] {
  const fallAsleepAt = nowMinutesOfDay() + FALL_ASLEEP_MINUTES
  return buildOptions(fallAsleepAt, 1)
}

export function getWakeOptionsFromBedTime(bedTime: string): CycleOption[] {
  const fallAsleepAt = toMinutesOfDay(bedTime) + FALL_ASLEEP_MINUTES
  return buildOptions(fallAsleepAt, 1)
}

export function getBedOptionsFromWakeTime(wakeTime: string): CycleOption[] {
  const wakeAt = toMinutesOfDay(wakeTime) - FALL_ASLEEP_MINUTES
  return buildOptions(wakeAt, -1)
}
