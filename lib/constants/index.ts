/**
 * API 기본 URL
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.rapportnote.com'

/**
 * Google Analytics ID
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

/**
 * 문의 이메일
 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hrpark@ailike.me'

/**
 * 네비게이션 메뉴
 */
export const NAV_ITEMS = [
  { label: '홈', href: '/' },
  { label: '가격', href: '/#pricing' },
  { label: '문의', href: '/contact' },
]
