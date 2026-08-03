import { PRODUCTS } from '../products'
import ProductCard from './ProductCard'
import ProductCarousel from './ProductCarousel'
import CoupangDisclosure from './CoupangDisclosure'

type ContextProductRecommendProps = {
  hook: string
  productIds: string[]
  /** 켜면 카드가 자동으로 흐르면서 손으로도 넘길 수 있는 캐러셀로 표시돼요. */
  carousel?: boolean
}

function ContextProductRecommend({ hook, productIds, carousel = false }: ContextProductRecommendProps) {
  const products = PRODUCTS.filter((product) => productIds.includes(product.id))
  if (products.length === 0) return null

  return (
    <section className="context-promo">
      <p className="context-promo__hook">
        {hook} <span className="context-promo__arrow">→</span> 이런 아이템은 어때요?
      </p>
      {carousel ? (
        <ProductCarousel products={products} />
      ) : (
        <div className="context-promo__cards">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <CoupangDisclosure />
    </section>
  )
}

export default ContextProductRecommend
