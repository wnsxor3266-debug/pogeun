import { useMemo, useState } from 'react'
import TimePicker from './TimePicker'
import { getBedOptionsFromWakeTime, getWakeOptionsFromBedTime, getWakeOptionsFromNow } from '../remSleep'

type Mode = 'now' | 'wake' | 'bed'

type SleepCycleCalculatorProps = {
  onOpenSleepTest: () => void
}

function SleepCycleCalculator({ onOpenSleepTest }: SleepCycleCalculatorProps) {
  const [mode, setMode] = useState<Mode>('now')
  const [wakeTimeInput, setWakeTimeInput] = useState('07:00')
  const [bedTimeInput, setBedTimeInput] = useState('23:30')

  const options = useMemo(() => {
    if (mode === 'wake') return getBedOptionsFromWakeTime(wakeTimeInput)
    if (mode === 'bed') return getWakeOptionsFromBedTime(bedTimeInput)
    return getWakeOptionsFromNow()
  }, [mode, wakeTimeInput, bedTimeInput])

  const resultHeading = mode === 'wake' ? '이 시간에 잠자리에 들어보세요' : '이 시간에 일어나 보세요'

  return (
    <div className="calculator fade-in">
      <div className="calculator__hero">
        <h1 className="calculator__title">
          몇 시에 일어나야
          <br />
          가장 개운할까요?
        </h1>
        <p className="calculator__subtitle">90분 수면 주기로 찾는 최적의 시간</p>
      </div>

      <div className="mode-select">
        <div className="mode-tabs">
          <button
            type="button"
            className={`mode-tab ${mode === 'now' ? 'is-active' : ''}`}
            onClick={() => setMode('now')}
          >
            지금 잘래요
          </button>
          <button
            type="button"
            className={`mode-tab ${mode === 'wake' ? 'is-active' : ''}`}
            onClick={() => setMode('wake')}
          >
            기상시간 정하기
          </button>
          <button
            type="button"
            className={`mode-tab ${mode === 'bed' ? 'is-active' : ''}`}
            onClick={() => setMode('bed')}
          >
            취침시간 정하기
          </button>
        </div>

        {mode === 'wake' && (
          <div className="mode-input">
            <p className="mode-input__label">일어나고 싶은 시간</p>
            <TimePicker value={wakeTimeInput} onChange={setWakeTimeInput} />
          </div>
        )}

        {mode === 'bed' && (
          <div className="mode-input">
            <p className="mode-input__label">잠자리에 들 시간</p>
            <TimePicker value={bedTimeInput} onChange={setBedTimeInput} />
          </div>
        )}
      </div>

      <div className="result-block">
        <p className="result-heading">{resultHeading}</p>
        <div className="result-grid">
          {options.map((option) => (
            <div key={option.cycles} className={`result-card ${option.recommended ? 'is-recommended' : ''}`}>
              <p className="result-card__time">{option.timeLabel}</p>
              <p className="result-card__meta">{option.durationLabel}</p>
              <p className="result-card__stars">
                {'★'.repeat(option.stars)}
                {'☆'.repeat(3 - option.stars)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="secondary-link" onClick={onOpenSleepTest}>
        내 수면은 건강할까? 수면 나이 테스트 →
      </button>
    </div>
  )
}

export default SleepCycleCalculator
