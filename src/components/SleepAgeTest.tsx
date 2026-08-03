import { useEffect, useState, type FormEvent } from 'react'
import CloudLogo from './CloudLogo'
import ChipGroup from './ChipGroup'
import TimePicker from './TimePicker'
import { calculateSleepAge, formatDuration, type SleepAnswers } from '../sleepAge'

const TOTAL_STEPS = 6

const AGE_RANGE_OPTIONS = [
  { label: '20대', value: 20 },
  { label: '30대', value: 30 },
  { label: '40대', value: 40 },
  { label: '50대', value: 50 },
  { label: '60대 이상', value: 60 },
]

const LATENCY_OPTIONS = [
  { label: '5분', value: 5 },
  { label: '10분', value: 10 },
  { label: '15분', value: 15 },
  { label: '20분', value: 20 },
  { label: '30분', value: 30 },
  { label: '45분', value: 45 },
  { label: '60분+', value: 60 },
]

const WAKE_COUNT_OPTIONS = [
  { label: '0회', value: 0 },
  { label: '1회', value: 1 },
  { label: '2회', value: 2 },
  { label: '3회', value: 3 },
  { label: '4회+', value: 4 },
]

const FATIGUE_OPTIONS = [
  { label: '1 · 쌩쌩해요', value: 1 },
  { label: '2 · 괜찮아요', value: 2 },
  { label: '3 · 보통이에요', value: 3 },
  { label: '4 · 피곤해요', value: 4 },
  { label: '5 · 탈진 직전이에요', value: 5 },
]

type Phase = 'question' | 'calculating' | 'result'

const defaultAnswers: SleepAnswers = {
  ageRangeStart: 30,
  bedTime: '23:30',
  wakeTime: '07:00',
  fallAsleepMinutes: 15,
  wakeCount: 1,
  fatigue: 3,
}

function SleepAgeTest() {
  const [phase, setPhase] = useState<Phase>('question')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<SleepAnswers>(defaultAnswers)
  const [toast, setToast] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  useEffect(() => {
    if (phase !== 'calculating') return
    const timer = setTimeout(() => setPhase('result'), 1400)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const result = calculateSleepAge(answers)

  function goNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      setPhase('calculating')
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1)
  }

  function restart() {
    setAnswers(defaultAnswers)
    setStep(0)
    setEmail('')
    setEmailSubmitted(false)
    setPhase('question')
  }

  async function handleShare() {
    const shareText = `저의 수면 나이는 ${result.age}세예요. 당신의 수면 나이도 확인해보세요 🌙`
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: '포근 · 수면 나이 테스트', text: shareText, url: shareUrl })
      } catch {
        // 사용자가 공유를 취소한 경우
      }
      return
    }

    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
    setToast('카카오톡에 붙여넣을 공유 문구가 복사되었어요')
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setToast('링크가 복사되었어요')
  }

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      setToast('올바른 이메일을 입력해주세요')
      return
    }
    setEmailSubmitted(true)
  }

  return (
    <>
      {phase === 'question' && (
        <main className="card fade-in">
          <div className="progress">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span key={i} className={`progress__dot ${i <= step ? 'is-active' : ''}`} />
            ))}
          </div>

          {step === 0 && (
            <section className="question fade-in">
              <h1 className="question__title">연령대가 어떻게 되세요?</h1>
              <ChipGroup
                options={AGE_RANGE_OPTIONS}
                value={answers.ageRangeStart}
                onChange={(v) => setAnswers((a) => ({ ...a, ageRangeStart: v }))}
              />
            </section>
          )}

          {step === 1 && (
            <section className="question fade-in">
              <h1 className="question__title">평소 몇 시에 잠자리에 드시나요?</h1>
              <TimePicker
                value={answers.bedTime}
                onChange={(v) => setAnswers((a) => ({ ...a, bedTime: v }))}
              />
            </section>
          )}

          {step === 2 && (
            <section className="question fade-in">
              <h1 className="question__title">평소 몇 시에 일어나시나요?</h1>
              <TimePicker
                value={answers.wakeTime}
                onChange={(v) => setAnswers((a) => ({ ...a, wakeTime: v }))}
              />
            </section>
          )}

          {step === 3 && (
            <section className="question fade-in">
              <h1 className="question__title">잠드는 데 보통 얼마나 걸리나요?</h1>
              <ChipGroup
                options={LATENCY_OPTIONS}
                value={answers.fallAsleepMinutes}
                onChange={(v) => setAnswers((a) => ({ ...a, fallAsleepMinutes: v }))}
              />
            </section>
          )}

          {step === 4 && (
            <section className="question fade-in">
              <h1 className="question__title">밤중에 몇 번 정도 깨시나요?</h1>
              <ChipGroup
                options={WAKE_COUNT_OPTIONS}
                value={answers.wakeCount}
                onChange={(v) => setAnswers((a) => ({ ...a, wakeCount: v }))}
              />
            </section>
          )}

          {step === 5 && (
            <section className="question fade-in">
              <h1 className="question__title">낮 동안 피로는 어느 정도인가요?</h1>
              <ChipGroup
                options={FATIGUE_OPTIONS}
                value={answers.fatigue}
                onChange={(v) => setAnswers((a) => ({ ...a, fatigue: v }))}
                vertical
              />
            </section>
          )}

          <div className="nav-buttons">
            <button type="button" className="btn btn--ghost" onClick={goBack} disabled={step === 0}>
              이전
            </button>
            <button type="button" className="btn btn--primary" onClick={goNext}>
              {step === TOTAL_STEPS - 1 ? '결과 보기' : '다음'}
            </button>
          </div>
        </main>
      )}

      {phase === 'calculating' && (
        <main className="card calculating fade-in">
          <div className="calculating__cloud">
            <CloudLogo />
          </div>
          <p className="calculating__text">당신의 수면 나이를 계산하는 중...</p>
        </main>
      )}

      {phase === 'result' && (
        <main className="result fade-in">
          <div className="result__hero">
            <p className="result__label">당신의 수면 나이는</p>
            <div className="result__age-wrap">
              <span className="result__age">{result.age}</span>
              <span className="result__unit">세</span>
            </div>
            <p className="result__diff">{result.comparisonLabel}</p>
          </div>

          <div className="result__info-card">
            <p className="result__summary">
              평균 수면 시간 <strong>{formatDuration(result.durationMinutes)}</strong>
            </p>
            <div className="result__divider" />
            <div className="tips-wrap">
              <p className="tips__heading">수면 습관 코칭</p>
              <ul className="tips">
                {result.tips.map((tip) => (
                  <li key={tip} className="tips__item">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="share-row">
            <button type="button" className="btn btn--primary btn--pill" onClick={handleShare}>
              카카오톡 공유
            </button>
            <button type="button" className="btn btn--ghost btn--pill" onClick={handleCopyLink}>
              링크 복사
            </button>
          </div>

          <form className="email-form" onSubmit={handleEmailSubmit}>
            <label className="email-form__label" htmlFor="notify-email">
              포근 앱 출시되면 알림 받기
            </label>
            {emailSubmitted ? (
              <p className="email-form__done">감사합니다! 출시 소식을 가장 먼저 알려드릴게요 🌙</p>
            ) : (
              <div className="email-form__row">
                <input
                  id="notify-email"
                  type="email"
                  className="email-form__input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn--primary">
                  알림 받기
                </button>
              </div>
            )}
          </form>

          <div className="result__footer">
            <button type="button" className="restart" onClick={restart}>
              다시 테스트하기
            </button>

            <p className="disclaimer">본 결과는 일반적인 수면 습관 참고용이며 의학적 진단이 아닙니다.</p>
          </div>
        </main>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}

export default SleepAgeTest
