import SleepScienceInfo from './SleepScienceInfo'

type MoreScreenProps = {
  onOpenSleepTest: () => void
}

function MoreScreen({ onOpenSleepTest }: MoreScreenProps) {
  return (
    <div className="more-screen fade-in">
      <button type="button" className="secondary-link secondary-link--feature" onClick={onOpenSleepTest}>
        내 수면은 건강할까? 수면 나이 테스트 →
      </button>

      <SleepScienceInfo />
    </div>
  )
}

export default MoreScreen
