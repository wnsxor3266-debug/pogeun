import { useState } from 'react'
import CloudLogo from './components/CloudLogo'
import SleepCycleCalculator from './components/SleepCycleCalculator'
import SleepAgeTest from './components/SleepAgeTest'
import SleepLog from './components/SleepLog'
import TipsScreen from './components/TipsScreen'
import StoreScreen from './components/StoreScreen'
import MoreScreen from './components/MoreScreen'
import TabBar, { type TabId } from './components/TabBar'
import { calculateStreak, loadSleepLogs } from './sleepLog'
import './App.css'

const TAB_TITLES: Record<TabId, string> = {
  home: '포근',
  log: '수면 기록',
  tips: '오늘의 팁',
  store: '수면 스토어',
  more: '더보기',
}

function App() {
  const [tab, setTab] = useState<TabId>('home')
  const [sleepTestOpen, setSleepTestOpen] = useState(false)
  const streak = calculateStreak(loadSleepLogs())

  if (sleepTestOpen) {
    return (
      <div className="app">
        <header className="app-header">
          <button
            type="button"
            className="app-header__close"
            onClick={() => setSleepTestOpen(false)}
            aria-label="닫기"
          >
            ✕
          </button>
          <p className="app-header__title">수면 나이 테스트</p>
          <span className="app-header__spacer" />
        </header>
        <div className="app-screen push-in">
          <SleepAgeTest />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header__leading">
          <CloudLogo size={26} />
        </span>
        <p className="app-header__title">{TAB_TITLES[tab]}</p>
        <span className="app-header__spacer" />
      </header>

      <div className="app-screen">
        {tab === 'home' && <SleepCycleCalculator />}
        {tab === 'log' && <SleepLog />}
        {tab === 'tips' && <TipsScreen />}
        {tab === 'store' && <StoreScreen />}
        {tab === 'more' && <MoreScreen onOpenSleepTest={() => setSleepTestOpen(true)} />}
      </div>

      <TabBar active={tab} onChange={setTab} logStreak={streak} />
    </div>
  )
}

export default App
