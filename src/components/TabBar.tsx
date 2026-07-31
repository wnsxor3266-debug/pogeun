import { HomeIcon, LogIcon, MoreIcon, StoreIcon, TipIcon } from './icons'

export type TabId = 'home' | 'log' | 'tips' | 'store' | 'more'

type TabBarProps = {
  active: TabId
  onChange: (tab: TabId) => void
  logStreak: number
}

const TABS: { id: TabId; label: string; Icon: typeof HomeIcon }[] = [
  { id: 'home', label: '홈', Icon: HomeIcon },
  { id: 'log', label: '수면기록', Icon: LogIcon },
  { id: 'tips', label: '팁', Icon: TipIcon },
  { id: 'store', label: '스토어', Icon: StoreIcon },
  { id: 'more', label: '더보기', Icon: MoreIcon },
]

function TabBar({ active, onChange, logStreak }: TabBarProps) {
  return (
    <nav className="tab-bar">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={`tab-bar__item ${active === id ? 'is-active' : ''}`}
          onClick={() => onChange(id)}
          aria-current={active === id ? 'page' : undefined}
        >
          <span className="tab-bar__icon-wrap">
            <Icon className="tab-bar__icon" />
            {id === 'log' && logStreak > 0 && <span className="tab-bar__badge">{logStreak}</span>}
          </span>
          <span className="tab-bar__label">{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default TabBar
