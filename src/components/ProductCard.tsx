import { PRODUCT_CATEGORIES, type Product } from '../products'
import { trackCustom } from '../metaPixel'

type ProductCardProps = {
  product: Product
  /** 쿠팡 링크 클릭 위치 구분용 (예: 'store_tab', 'home_carousel') */
  location: string
}

function ProductCard({ product, location }: ProductCardProps) {
  const { Icon } = PRODUCT_CATEGORIES[product.category]
  const hasLink = product.affiliateUrl.trim().length > 0

  function handleClick() {
    trackCustom('ClickStore', { product: product.name, location })
  }

  return (
    <div className="product-card">
      <div className="product-card__image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} loading="lazy" />
        ) : (
          <span className="product-card__placeholder">
            <Icon className="product-card__placeholder-icon" />
            <span className="product-card__placeholder-label">사진 준비중</span>
          </span>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__desc">{product.description}</p>
      </div>
      {hasLink ? (
        <a
          className="product-card__cta"
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
        >
          보러가기 →
        </a>
      ) : (
        <button type="button" className="product-card__cta is-pending" disabled>
          링크 준비중
        </button>
      )}
    </div>
  )
}

export default ProductCard
