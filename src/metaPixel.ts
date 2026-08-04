declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function fbqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

/** SPA 탭/모달 전환 시 가상 페이지뷰를 보낼 때 사용해요. 초기 로드의 PageView는 index.html 베이스 코드가 이미 보냅니다. */
export function trackPageView() {
  if (!fbqReady()) return
  window.fbq!('track', 'PageView')
}

/** Meta 표준 이벤트(Lead, Purchase 등) 발화용. */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!fbqReady()) return
  if (params) window.fbq!('track', eventName, params)
  else window.fbq!('track', eventName)
}

/** 표준 이벤트에 없는 서비스 고유 행동을 기록하는 커스텀 이벤트용. */
export function trackCustom(eventName: string, params?: Record<string, unknown>) {
  if (!fbqReady()) return
  if (params) window.fbq!('trackCustom', eventName, params)
  else window.fbq!('trackCustom', eventName)
}
