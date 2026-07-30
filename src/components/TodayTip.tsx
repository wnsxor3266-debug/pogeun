import { getTodayTip } from '../sleepTips'

function TodayTip() {
  const tip = getTodayTip()

  return (
    <div className="tip-card">
      <p className="tip-card__label">오늘의 수면 팁</p>
      <p className="tip-card__text">{tip}</p>
    </div>
  )
}

export default TodayTip
