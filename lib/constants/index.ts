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

/**
 * 앱 버전
 */
export const APP_VERSION = '1.0.0'

/**
 * 다운로드 URL (GitHub Releases)
 *
 * TODO: GitHub Release를 생성한 후 실제 URL로 변경하세요.
 *
 * 1. GitHub 저장소에서 Release 생성
 * 2. 빌드된 파일 업로드:
 *    - rapportnote_frontend/RapportNote-macOS-v1.0.0.dmg
 * 3. Release URL을 아래 mac 필드에 입력
 *
 * 예시: https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0.0/RapportNote-macOS-v1.0.0.dmg
 */
export const DOWNLOAD_URLS = {
  mac: 'https://github.com/AILIKE-ME/rapportnote_landing/releases/download/v1.0.0/RapportNote-macOS-v1.0.0.dmg',
  windows: 'https://github.com/AILIKE-ME/rapportnote_landing/releases/download/v1.0.0/rapportnote-windows-x64.zip',
} as const

/**
 * 플랫폼별 다운로드 파일명
 */
export const DOWNLOAD_FILENAMES = {
  mac: 'RapportNote-macOS-v1.0.0.dmg',
  windows: 'rapportnote-windows-x64.zip',
} as const

/**
 * 플랫폼별 다운로드 가능 여부
 */
export const DOWNLOAD_AVAILABLE = {
  mac: true,
  windows: true,
} as const
