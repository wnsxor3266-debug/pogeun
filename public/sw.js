self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 예전 버전이 남겨둔 캐시가 있다면 정리해요.
      const cacheKeys = await caches.keys()
      await Promise.all(cacheKeys.map((key) => caches.delete(key)))
      await self.clients.claim()
    })(),
  )
})

// 오프라인 캐싱은 쓰지 않아요. 포근은 온라인 상태에서만 의미 있는 앱이라
// HTML·JS·CSS를 항상 네트워크에서 최신으로 받는 쪽이 더 안전합니다.
// fetch 핸들러는 PWA 설치 요건(등록된 SW + fetch 리스너) 충족용으로만 유지해요.
self.addEventListener('fetch', () => {})
