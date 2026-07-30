import { SLEEP_TIPS, getTodayTip } from '../sleepTips'

function TipsScreen() {
  const todayTip = getTodayTip()
  const todayIndex = SLEEP_TIPS.indexOf(todayTip)

  return (
    <div className="tips-screen fade-in">
      <div className="tip-card tip-card--hero">
        <p className="tip-card__label">오늘의 수면 팁</p>
        <p className="tip-card__text tip-card__text--hero">{todayTip}</p>
      </div>

      <div className="tips-list">
        <p className="tips-list__heading">전체 팁 모음</p>
        <div className="tips-list__items">
          {SLEEP_TIPS.map((tip, index) => (
            <div key={tip} className={`tips-list__item ${index === todayIndex ? 'is-today' : ''}`}>
              <span className="tips-list__index">{index + 1}</span>
              <p className="tips-list__text">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TipsScreen
