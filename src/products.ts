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
    imageUrl: '',
    affiliateUrl: 'https://link.coupang.com/a/fT6l8CMc6C',
  },
  {
    id: 'mood-light',
    name: '무드등',
    description: '은은한 빛으로 편안한 잠자리 분위기를 만들어주는 조명이에요.',
    category: 'sleepGoods',
    imageUrl: '',
    affiliateUrl: 'https://link.coupang.com/a/fT6rRG2edg',
  },
  {
    id: 'white-noise',
    name: '백색소음기',
    description: '작은 소리에도 잘 깨는 분들에게 도움을 줄 수 있는 백색소음기예요.',
    category: 'sleepGoods',
    imageUrl: '',
    affiliateUrl: '', // TODO: 쿠팡파트너스 링크
  },
  {
    id: 'blue-light-glasses',
    name: '블루라이트 차단 안경',
    description: '자기 전 화면을 자주 보는 분들이 많이 찾는 아이템이에요.',
    category: 'sleepGoods',
    imageUrl: '',
    affiliateUrl: '', // TODO: 쿠팡파트너스 링크
  },
  {
    id: 'aroma-diffuser',
    name: '아로마 디퓨저',
    description: '은은한 향으로 잠들기 전 마음을 편안하게 해주는 디퓨저예요.',
    category: 'aroma',
    imageUrl: '',
    affiliateUrl: '', // TODO: 쿠팡파트너스 링크
  },
  {
    id: 'sleep-tea',
    name: '수면 유도 차 (캐모마일 등)',
    description: '따뜻한 차 한 잔으로 몸을 이완하고 싶은 분들이 찾는 아이템이에요.',
    category: 'aroma',
    imageUrl: '',
    affiliateUrl: '', // TODO: 쿠팡파트너스 링크
  },
  {
    id: 'memory-foam-pillow',
    name: '메모리폼 베개',
    description: '목과 어깨가 자주 뻐근한 분들이 많이 찾는 베개예요.',
    category: 'bedding',
    imageUrl: '',
    affiliateUrl: '', // TODO: 쿠팡파트너스 링크
  },
]
