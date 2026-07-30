import { useState } from 'react'
import CloudLogo from './components/CloudLogo'
import SleepCycleCalculator from './components/SleepCycleCalculator'
import SleepAgeTest from './components/SleepAgeTest'
import './App.css'

type View = 'calculator' | 'sleepTest'

function App() {
  const [view, setView] = useState<View>('calculator')

  return (
    <div className="app">
      <header className="app__header">
        <CloudLogo />
        <p className="app__brand">포근</p>
      </header>

      {view === 'calculator' && <SleepCycleCalculator onOpenSleepTest={() => setView('sleepTest')} />}
      {view === 'sleepTest' && <SleepAgeTest onBack={() => setView('calculator')} />}
    </div>
  )
}

export default App
