import { useEffect, useRef, useState } from 'react'
import CloudLogo from './components/CloudLogo'
import SleepCycleCalculator from './components/SleepCycleCalculator'
import SleepAgeTest from './components/SleepAgeTest'
import SleepLog from './components/SleepLog'
import TipsScreen from './components/TipsScreen'
import StoreScreen from './components/StoreScreen'
import MoreScreen from './components/MoreScreen'
import PrivacyScreen from './components/PrivacyScreen'
import TabBar, { type TabId } from './components/TabBar'
import { calculateStreak, loadSleepLogs } from './sleepLog'
import { trackCustom, trackPageView } from './metaPixel'
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
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const streak = calculateStreak(loadSleepLogs())
  const isFirstPageView = useRef(true)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    // 이 로드 시점에 이미 다른 SW가 페이지를 제어하고 있었다면(=재방문),
    // 이후의 controllerchange는 진짜 업데이트예요. 처음 설치되는 경우엔
    // controller가 없다가 생기는 것뿐이라 업데이트 안내를 띄우지 않아요.
    const hadController = Boolean(navigator.serviceWorker.controller)

    function handleControllerChange() {
      if (hadController) setUpdateAvailable(true)
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)
    return () => navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
  }, [])

  useEffect(() => {
    function handleAppInstalled() {
      trackCustom('InstallPWA')
    }
    window.addEventListener('appinstalled', handleAppInstalled)
    return () => window.removeEventListener('appinstalled', handleAppInstalled)
  }, [])

  // index.html 베이스 코드가 최초 로드 시 PageView를 이미 보내므로,
  // 여기서는 탭/테스트 모달 전환(=가상 페이지 변경)에만 추가로 쏴요.
  const virtualPage = sleepTestOpen ? 'sleep_test' : privacyOpen ? 'privacy' : tab
  useEffect(() => {
    if (isFirstPageView.current) {
      isFirstPageView.current = false
      return
    }
    trackPageView()
  }, [virtualPage])

  const updateBanner = updateAvailable && (
    <button type="button" className="toast toast--update" onClick={() => window.location.reload()}>
      포근이 업데이트됐어요 · 눌러서 새로고침
    </button>
  )

  if (sleepTestOpen) {
    return (
      <div className="app">
        <header className="app-header app-header--modal">
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
        {updateBanner}
      </div>
    )
  }

  if (privacyOpen) {
    return (
      <div className="app">
        <header className="app-header app-header--modal">
          <button
            type="button"
            className="app-header__close"
            onClick={() => setPrivacyOpen(false)}
            aria-label="닫기"
          >
            ✕
          </button>
          <p className="app-header__title">개인정보 처리방침</p>
          <span className="app-header__spacer" />
        </header>
        <div className="app-screen push-in">
          <PrivacyScreen />
        </div>
        {updateBanner}
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header app-header--main">
        <span className="app-header__leading">
          <CloudLogo size={26} />
          <span className="app-header__brand">포근</span>
        </span>
        <p className="app-header__title">{TAB_TITLES[tab]}</p>
        <span className="app-header__spacer" />
      </header>

      <TabBar active={tab} onChange={setTab} logStreak={streak} />

      <div className="app-screen">
        {tab === 'home' && <SleepCycleCalculator />}
        {tab === 'log' && <SleepLog />}
        {tab === 'tips' && <TipsScreen />}
        {tab === 'store' && <StoreScreen />}
        {tab === 'more' && (
          <MoreScreen onOpenSleepTest={() => setSleepTestOpen(true)} onOpenPrivacy={() => setPrivacyOpen(true)} />
        )}
      </div>

      {updateBanner}
    </div>
  )
}

export default App
