import { PRODUCT_CATEGORIES, PRODUCTS, type ProductCategory } from '../products'
import ProductCard from './ProductCard'
import CoupangDisclosure from './CoupangDisclosure'

const CATEGORY_ORDER: ProductCategory[] = ['sleepGoods', 'aroma', 'bedding']

function StoreScreen() {
  return (
    <div className="store-screen fade-in">
      <div className="store-screen__hero">
        <h1 className="store-screen__title">수면 스토어</h1>
        <p className="store-screen__subtitle">편안한 잠자리를 위한 아이템을 모아봤어요</p>
      </div>

      <CoupangDisclosure />

      {CATEGORY_ORDER.map((category) => {
        const items = PRODUCTS.filter((product) => product.category === category)
        if (items.length === 0) return null
        return (
          <div className="store-category" key={category}>
            <h2 className="store-category__heading">{PRODUCT_CATEGORIES[category].label}</h2>
            <div className="store-category__grid">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} location="store_tab" />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StoreScreen
