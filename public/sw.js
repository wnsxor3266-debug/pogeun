self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// 오프라인 캐싱은 아직 없고, PWA 설치 조건(등록된 서비스워커 + fetch 핸들러)만 충족시킵니다.
self.addEventListener('fetch', () => {})
