import { PRODUCTS } from '../products'
import ProductCard from './ProductCard'
import CoupangDisclosure from './CoupangDisclosure'

type ContextProductRecommendProps = {
  hook: string
  productIds: string[]
}

function ContextProductRecommend({ hook, productIds }: ContextProductRecommendProps) {
  const products = PRODUCTS.filter((product) => productIds.includes(product.id))
  if (products.length === 0) return null

  return (
    <section className="context-promo">
      <p className="context-promo__hook">
        {hook} <span className="context-promo__arrow">→</span> 이런 아이템은 어때요?
      </p>
      <div className="context-promo__cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CoupangDisclosure />
    </section>
  )
}

export default ContextProductRecommend
