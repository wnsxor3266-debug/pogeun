import { useEffect, useRef, useState } from 'react'
import TimePicker from './TimePicker'
import { loadReminderSettings, millisecondsUntil, saveReminderSettings } from '../bedtimeReminder'
import { formatClockTime } from '../sleepLog'

const supported = typeof window !== 'undefined' && 'Notification' in window

function BedtimeReminder() {
  const [settings, setSettings] = useState(() => loadReminderSettings())
  const [permission, setPermission] = useState<NotificationPermission>(supported ? Notification.permission : 'denied')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    saveReminderSettings(settings)
  }, [settings])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!supported || !settings.enabled || permission !== 'granted') return

    function scheduleNext() {
      timerRef.current = setTimeout(() => {
        new Notification('포근', {
          body: '슬슬 잘 시간이에요 🌙',
          icon: '/favicon.svg',
        })
        scheduleNext()
      }, millisecondsUntil(settings.time))
    }
    scheduleNext()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [settings.enabled, settings.time, permission])

  async function handleToggle() {
    if (!supported) return

    if (!settings.enabled) {
      if (Notification.permission === 'default') {
        const result = await Notification.requestPermission()
        setPermission(result)
        if (result !== 'granted') return
      } else if (Notification.permission === 'denied') {
        setPermission('denied')
        return
      } else {
        setPermission('granted')
      }
    }

    setSettings((s) => ({ ...s, enabled: !s.enabled }))
  }

  return (
    <div className="reminder-card">
      <div className="reminder-card__header">
        <p className="reminder-card__title">취침 알림</p>
        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          className={`reminder-toggle ${settings.enabled ? 'is-on' : ''}`}
          onClick={handleToggle}
          disabled={!supported}
        >
          <span className="reminder-toggle__knob" />
        </button>
      </div>

      {!supported && <p className="reminder-card__hint">이 브라우저는 알림 기능을 지원하지 않아요.</p>}

      {supported && permission === 'denied' && (
        <p className="reminder-card__hint">
          알림이 차단되어 있어요. 브라우저 설정에서 이 사이트의 알림 권한을 허용해주세요.
        </p>
      )}

      {supported && permission !== 'denied' && (
        <>
          <p className="reminder-card__hint">
            {settings.enabled
              ? `매일 ${formatClockTime(settings.time)}에 "슬슬 잘 시간이에요" 알림을 보내드려요.`
              : '목표 취침 시간을 정해두면, 그 시간에 살짝 알려드려요.'}
          </p>
          <TimePicker value={settings.time} onChange={(v) => setSettings((s) => ({ ...s, time: v }))} />
        </>
      )}
    </div>
  )
}

export default BedtimeReminder
