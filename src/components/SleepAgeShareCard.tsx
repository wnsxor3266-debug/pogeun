import { forwardRef } from 'react'
import CloudLogo from './CloudLogo'

type SleepAgeShareCardProps = {
  age: number
  comparisonLabel: string
}

const KR_SANS =
  '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif'
const SERIF = 'Georgia, "Times New Roman", serif'

/** 화면 밖(off-screen)에 렌더링되어 html-to-image로 캡처되는 공유 전용 카드. 9:16 세로형. */
const SleepAgeShareCard = forwardRef<HTMLDivElement, SleepAgeShareCardProps>(function SleepAgeShareCard(
  { age, comparisonLabel },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: -9999,
        width: 540,
        height: 960,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        padding: '80px 48px',
        textAlign: 'center',
        color: '#f2efe9',
        fontFamily: KR_SANS,
        background:
          'radial-gradient(620px 620px at 50% -4%, rgba(217,181,106,0.18) 0%, transparent 62%), linear-gradient(180deg, #21253c 0%, #1c2033 46%, #171a2a 100%)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: 7,
          color: 'rgba(242, 239, 233, 0.75)',
        }}
      >
        SLEEP AGE
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <p
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 500,
            color: 'rgba(242, 239, 233, 0.7)',
          }}
        >
          나의 수면 나이는
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span
            style={{
              fontFamily: SERIF,
              fontSize: 216,
              lineHeight: 0.9,
              letterSpacing: -6,
              color: '#d9b56a',
            }}
          >
            {age}
          </span>
          <span style={{ fontFamily: SERIF, fontSize: 50, color: '#d9b56a' }}>세</span>
        </div>
      </div>

      <p
        style={{
          margin: 0,
          maxWidth: 440,
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: 0.2,
          color: '#f2efe9',
        }}
      >
        {comparisonLabel}
      </p>

      <div
        style={{
          position: 'absolute',
          bottom: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 18,
          letterSpacing: 0.4,
          color: 'rgba(242, 239, 233, 0.55)',
        }}
      >
        <CloudLogo size={22} />
        <span>포근</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>pogeun.cloud</span>
      </div>
    </div>
  )
})

export default SleepAgeShareCard
