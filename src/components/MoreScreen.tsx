import SleepScienceInfo from './SleepScienceInfo'

type MoreScreenProps = {
  onOpenSleepTest: () => void
  onOpenPrivacy: () => void
}

function MoreScreen({ onOpenSleepTest, onOpenPrivacy }: MoreScreenProps) {
  return (
    <div className="more-screen fade-in">
      <button type="button" className="secondary-link secondary-link--feature" onClick={onOpenSleepTest}>
        내 수면은 건강할까? 수면 나이 테스트 →
      </button>

      <SleepScienceInfo />

      <button type="button" className="secondary-link" onClick={onOpenPrivacy}>
        개인정보 처리방침
      </button>
    </div>
  )
}

export default MoreScreen
