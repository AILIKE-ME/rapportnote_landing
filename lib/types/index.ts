/**
 * 기능 카드 타입
 */
export interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

/**
 * 가격 플랜 타입
 */
export interface PricingPlan {
  id: string
  name: string
  price: number
  features: string[]
  highlighted?: boolean
}

/**
 * 문의 폼 데이터 타입
 */
export interface ContactFormData {
  name: string
  email: string
  message: string
}
