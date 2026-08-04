import { useMemo, useState } from 'react'
import TimePicker from './TimePicker'
import ChipGroup from './ChipGroup'
import ContextProductRecommend from './ContextProductRecommend'
import { formatDuration } from '../sleepAge'
import { getPersonalizedRecommendation } from '../productRecommend'
import {
  addSleepLog,
  calculateStreak,
  formatClockTime,
  formatDateLabel,
  formatShortDate,
  getTodayDate,
  loadSleepLogs,
  type SleepLogEntry,
} from '../sleepLog'

const QUALITY_OPTIONS = [
  { label: '1 · 뒤척였어요', value: 1 },
  { label: '2 · 자주 깼어요', value: 2 },
  { label: '3 · 보통이었어요', value: 3 },
  { label: '4 · 잘 잤어요', value: 4 },
  { label: '5 · 푹 잤어요', value: 5 },
]

function SleepLog() {
  const [logs, setLogs] = useState<SleepLogEntry[]>(() => loadSleepLogs())
  const todayEntry = useMemo(() => logs.find((e) => e.date === getTodayDate()) ?? null, [logs])

  const [bedTime, setBedTime] = useState(todayEntry?.bedTime ?? '23:30')
  const [wakeTime, setWakeTime] = useState(todayEntry?.wakeTime ?? '07:00')
  const [quality, setQuality] = useState(todayEntry?.quality ?? 3)
  const [savedEntry, setSavedEntry] = useState<SleepLogEntry | null>(todayEntry)

  function handleSave() {
    const entry = addSleepLog(bedTime, wakeTime, quality)
    setLogs(loadSleepLogs())
    setSavedEntry(entry)
  }

  const streak = useMemo(() => calculateStreak(logs), [logs])
  const history = useMemo(() => [...logs].sort((a, b) => b.date.localeCompare(a.date)), [logs])
  const chartEntries = useMemo(() => [...logs].sort((a, b) => a.date.localeCompare(b.date)).slice(-14), [logs])
  const personalizedReco = useMemo(() => getPersonalizedRecommendation(logs), [logs])

  return (
    <div className="sleep-log fade-in">
      <div className="sleep-log__hero">
        <h1 className="sleep-log__title">오늘의 수면을 기록해보세요</h1>
        <p className="sleep-log__subtitle">잠든 시간과 일어난 시간, 느낀 대로 남겨두면 돼요</p>
      </div>

      {streak > 0 && (
        <div className="streak-badge">
          <span className="streak-badge__count">{streak}</span>
          <span className="streak-badge__text">일 연속 기록 중 🔥</span>
        </div>
      )}

      {savedEntry && (
        <div className="score-banner">
          <p className="score-banner__label">
            {savedEntry.date === getTodayDate() ? '오늘 기록한 수면 점수' : '수면 점수'}
          </p>
          <p className="score-banner__score">
            {savedEntry.score}
            <span className="score-banner__unit">점</span>
          </p>
          <p className="score-banner__meta">
            {formatDateLabel(savedEntry.date)} · {formatDuration(savedEntry.durationMinutes)} 수면
          </p>
        </div>
      )}

      {personalizedReco && (
        <ContextProductRecommend
          hook={personalizedReco.hook}
          productIds={personalizedReco.productIds}
          location="log_recommend"
        />
      )}

      <div className="log-form">
        <div className="log-form__field">
          <p className="log-form__label">잠든 시간</p>
          <TimePicker value={bedTime} onChange={setBedTime} />
        </div>

        <div className="log-form__field">
          <p className="log-form__label">일어난 시간</p>
          <TimePicker value={wakeTime} onChange={setWakeTime} />
        </div>

        <div className="log-form__field">
          <p className="log-form__label">수면의 질</p>
          <ChipGroup options={QUALITY_OPTIONS} value={quality} onChange={setQuality} vertical />
        </div>

        <button type="button" className="btn btn--primary" onClick={handleSave}>
          {todayEntry ? '오늘 기록 수정하기' : '기록하기'}
        </button>
      </div>

      {chartEntries.length > 0 && (
        <div className="log-chart">
          <p className="log-chart__heading">최근 수면 점수</p>
          <div className="log-chart__bars">
            {chartEntries.map((entry) => (
              <div className="log-chart__bar-col" key={entry.date}>
                <div className="log-chart__bar" style={{ height: `${Math.max(entry.score, 4)}%` }} />
              </div>
            ))}
          </div>
          <p className="log-chart__range">
            {formatShortDate(chartEntries[0].date)} ~ {formatShortDate(chartEntries[chartEntries.length - 1].date)}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="log-history">
          <p className="log-history__heading">지난 기록</p>
          <div className="log-history__list">
            {history.map((entry) => (
              <div className="log-history__item" key={entry.date}>
                <div className="log-history__item-main">
                  <p className="log-history__date">{formatDateLabel(entry.date)}</p>
                  <p className="log-history__detail">
                    {formatClockTime(entry.bedTime)} 취침 · {formatClockTime(entry.wakeTime)} 기상 ·{' '}
                    {formatDuration(entry.durationMinutes)}
                  </p>
                  <p className="log-history__quality">
                    {'★'.repeat(entry.quality)}
                    {'☆'.repeat(5 - entry.quality)}
                  </p>
                </div>
                <p className="log-history__score">
                  {entry.score}
                  <span>점</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SleepLog
