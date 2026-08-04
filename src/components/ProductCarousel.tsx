import { useEffect, useRef } from 'react'
import ProductCard from './ProductCard'
import type { Product } from '../products'

type ProductCarouselProps = {
  products: Product[]
  location: string
}

const LOOP_SECONDS = 36
const RESUME_DELAY_MS = 2500

function ProductCarousel({ products, location }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const resumeTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 카드 목록이 2벌 복제돼 있어서, 스크롤 위치가 절반을 넘으면 그만큼
    // 되돌려 이음새 없이 순환시켜요. 자동/수동 스크롤 양쪽에 다 적용돼서
    // 손으로 앞뒤 어느 방향으로 넘겨도 끊김 없이 돌아갑니다.
    function handleScroll() {
      const half = container!.scrollWidth / 2
      if (half <= 0) return
      if (container!.scrollLeft >= half) {
        container!.scrollLeft -= half
      } else if (container!.scrollLeft <= 0) {
        container!.scrollLeft += half
      }
    }

    function pause() {
      pausedRef.current = true
      window.clearTimeout(resumeTimerRef.current)
    }

    function scheduleResume() {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false
      }, RESUME_DELAY_MS)
    }

    function resumeImmediately() {
      window.clearTimeout(resumeTimerRef.current)
      pausedRef.current = false
    }

    function handleWheel() {
      pause()
      scheduleResume()
    }

    container.addEventListener('pointerdown', pause)
    container.addEventListener('pointerup', scheduleResume)
    container.addEventListener('pointercancel', scheduleResume)
    container.addEventListener('wheel', handleWheel, { passive: true })
    container.addEventListener('mouseenter', pause)
    container.addEventListener('mouseleave', resumeImmediately)
    container.addEventListener('scroll', handleScroll, { passive: true })

    let frameId = 0
    let lastTime: number | null = null

    function tick(time: number) {
      if (lastTime === null) lastTime = time
      const delta = time - lastTime
      lastTime = time

      if (!pausedRef.current) {
        const half = container!.scrollWidth / 2
        const pxPerMs = half / (LOOP_SECONDS * 1000)
        container!.scrollLeft += pxPerMs * delta
      }

      frameId = requestAnimationFrame(tick)
    }

    if (!reduceMotion) {
      frameId = requestAnimationFrame(tick)
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.clearTimeout(resumeTimerRef.current)
      container.removeEventListener('pointerdown', pause)
      container.removeEventListener('pointerup', scheduleResume)
      container.removeEventListener('pointercancel', scheduleResume)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('mouseenter', pause)
      container.removeEventListener('mouseleave', resumeImmediately)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="context-promo__carousel" ref={containerRef}>
      <div className="context-promo__track">
        {[...products, ...products].map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} location={location} />
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
