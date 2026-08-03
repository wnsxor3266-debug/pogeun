import { DropletIcon, MoonIcon, PillowIcon } from './components/icons'

export type ProductCategory = 'sleepGoods' | 'aroma' | 'bedding'

export type Product = {
  id: string
  name: string
  description: string
  category: ProductCategory
  /** 실제 상품 사진 URL. 비워두면 아이콘 플레이스홀더가 대신 표시돼요. */
  imageUrl: string
  /** 쿠팡파트너스 승인 후 실제 링크로 교체하세요. 비워두면 버튼이 "링크 준비중"으로 표시돼요. */
  affiliateUrl: string
}

export const PRODUCT_CATEGORIES: Record<ProductCategory, { label: string; Icon: typeof MoonIcon }> = {
  sleepGoods: { label: '숙면 아이템', Icon: MoonIcon },
  aroma: { label: '아로마', Icon: DropletIcon },
  bedding: { label: '침구', Icon: PillowIcon },
}

/**
 * ============================================================
 *  쿠팡파트너스 제휴 상품 목록
 *  승인 완료 후에는 아래 각 상품의 affiliateUrl 값만 채워 넣으면
 *  홈 화면 추천 카드 · 팁 화면 추천 카드 · 스토어 탭 전체에 자동 반영돼요.
 *  (원하면 imageUrl에 실제 상품 사진 주소도 넣을 수 있어요.)
 * ============================================================
 */
export const PRODUCTS: Product[] = [
  {
    id: 'eye-mask',
    name: '수면 안대',
    description: '빛에 예민한 분들이 많이 찾는 암막 안대예요.',
    category: 'sleepGoods',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/ae2e/fe08bdbc3ecc7a345d786c1dd1c49cb99fbe1ab1e6f75fb912832409ded4.webp',
    affiliateUrl: 'https://link.coupang.com/a/fT6l8CMc6C',
  },
  {
    id: 'mood-light',
    name: '무드등',
    description: '은은한 빛으로 편안한 잠자리 분위기를 만들어주는 조명이에요.',
    category: 'sleepGoods',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/4812/7d72e75d105b7c7fea9043da5f82375a69873546d5d97ea324ed061a307f.jpg',
    affiliateUrl: 'https://link.coupang.com/a/fT6rRG2edg',
  },
  {
    id: 'white-noise',
    name: '백색소음기',
    description: '작은 소리에도 잘 깨는 분들에게 도움을 줄 수 있는 백색소음기예요.',
    category: 'sleepGoods',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/7918/549ac4cefdef7ade607cf1ee1cd0cfb17b31d9eeac60d29b2372d1e969ab.jpg',
    affiliateUrl: 'https://link.coupang.com/a/fT8qnO2m4q',
  },
  {
    id: 'blue-light-glasses',
    name: '블루라이트 차단 안경',
    description: '자기 전 화면을 자주 보는 분들이 많이 찾는 아이템이에요.',
    category: 'sleepGoods',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/ecc6/b1efd892b4df9994489eb782fd08e63b4ddd50d5966d36a67d71a1c7f2fa.png',
    affiliateUrl: 'https://link.coupang.com/a/fT8mEALJBY',
  },
  {
    id: 'aroma-diffuser',
    name: '아로마 디퓨저',
    description: '은은한 향으로 잠들기 전 마음을 편안하게 해주는 디퓨저예요.',
    category: 'aroma',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/d265/f798018fe829f373a3b7c1cc55bec35a38b266d58a85ae772344b0c3cdc6.png',
    affiliateUrl: 'https://link.coupang.com/a/fT7T0YJHUq',
  },
  {
    id: 'sleep-tea',
    name: '수면 유도 차 (캐모마일 등)',
    description: '따뜻한 차 한 잔으로 몸을 이완하고 싶은 분들이 찾는 아이템이에요.',
    category: 'aroma',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/image_audit/stage/manual/643079d33eb440ca256db0de000b097ec825439b3eee1c809e05e3a55535_1751876473731.jpg',
    affiliateUrl: 'https://link.coupang.com/a/fT8dxCIL9w',
  },
  {
    id: 'memory-foam-pillow',
    name: '메모리폼 베개',
    description: '목과 어깨가 자주 뻐근한 분들이 많이 찾는 베개예요.',
    category: 'bedding',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/600e/a9114d6e1ea823e9d42ec96d07a6578e9fa7fd6f622a8215ac5ff4c8d319.jpg',
    affiliateUrl: 'https://link.coupang.com/a/fT8jjJIMYm',
  },
  {
    id: 'weighted-blanket',
    name: '중력 이불',
    description: '몸을 부드럽게 눌러주는 무게감으로 편안한 잠자리를 도와주는 담요예요.',
    category: 'bedding',
    imageUrl:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/346e/5e5955a23ad4e2041c044570433ec5b5ac05cf109cb61794090e3ae4080b.png',
    affiliateUrl: 'https://link.coupang.com/a/fT79argMx2',
  },
]
