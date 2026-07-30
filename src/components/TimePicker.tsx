import { useLayoutEffect, useRef } from 'react'

const ITEM_HEIGHT = 40

const PERIODS = ['오전', '오후']
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1))
const MINUTES = ['00', '10', '20', '30', '40', '50']

function parseTime(time: string) {
  const [hStr, mStr] = time.split(':')
  const h = Number(hStr)
  const period = h < 12 ? '오전' : '오후'
  let hour = h % 12
  if (hour === 0) hour = 12
  const minute = Math.round(Number(mStr) / 10) * 10
  return { period, hour: String(hour), minute: String(minute % 60).padStart(2, '0') }
}

function buildTime(period: string, hourStr: string, minuteStr: string): string {
  let hour = Number(hourStr) % 12
  if (period === '오후') hour += 12
  return `${String(hour).padStart(2, '0')}:${minuteStr}`
}

type WheelColumnProps = {
  items: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function WheelColumn({ items, value, onChange, className }: WheelColumnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasMounted = useRef(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useLayoutEffect(() => {
    const el = ref.current
    const idx = items.indexOf(value)
    if (!el || idx === -1) return
    const target = idx * ITEM_HEIGHT
    if (!hasMounted.current) {
      el.scrollTop = target
      hasMounted.current = true
      return
    }
    if (Math.abs(el.scrollTop - target) > 1) {
      el.scrollTo({ top: target, behavior: 'smooth' })
    }
  }, [value, items])

  function handleScroll() {
    const el = ref.current
    if (!el) return
    if (scrollTimer.current) clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      const idx = Math.round(el.scrollTop / ITEM_HEIGHT)
      const clamped = Math.min(items.length - 1, Math.max(0, idx))
      const picked = items[clamped]
      el.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' })
      if (picked !== value) onChange(picked)
    }, 100)
  }

  return (
    <div ref={ref} className={`wheel-col ${className ?? ''}`} onScroll={handleScroll}>
      {items.map((item) => (
        <div
          key={item}
          className={`wheel-item ${item === value ? 'is-selected' : ''}`}
          onClick={() => onChange(item)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

type TimePickerProps = {
  value: string
  onChange: (value: string) => void
}

function TimePicker({ value, onChange }: TimePickerProps) {
  const parsed = parseTime(value)

  function update(part: 'period' | 'hour' | 'minute', next: string) {
    const merged = { ...parsed, [part]: next }
    onChange(buildTime(merged.period, merged.hour, merged.minute))
  }

  return (
    <div className="time-picker">
      <div className="time-picker__highlight" />
      <WheelColumn
        items={PERIODS}
        value={parsed.period}
        onChange={(v) => update('period', v)}
        className="wheel-col--period"
      />
      <WheelColumn
        items={HOURS}
        value={parsed.hour}
        onChange={(v) => update('hour', v)}
        className="wheel-col--hour"
      />
      <span className="time-picker__colon">:</span>
      <WheelColumn
        items={MINUTES}
        value={parsed.minute}
        onChange={(v) => update('minute', v)}
        className="wheel-col--minute"
      />
    </div>
  )
}

export default TimePicker
