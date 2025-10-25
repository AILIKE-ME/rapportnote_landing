import clsx, { ClassValue } from 'clsx'

/**
 * 클래스 이름을 병합하는 유틸리티 함수.
 *
 * @param {ClassValue[]} inputs - 병합할 클래스 이름들
 * @returns {string} 병합된 클래스 이름
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/**
 * 날짜를 "YYYY-MM-DD" 형식으로 포맷합니다.
 *
 * @param {Date} date - 포맷할 날짜
 * @returns {string} 포맷된 날짜 문자열
 *
 * @example
 * formatDate(new Date('2024-01-15')) // "2024-01-15"
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * 플랫폼 타입
 */
export type Platform = 'mac' | 'windows'

/**
 * 파일 다운로드를 트리거합니다.
 *
 * @param {string} url - 다운로드할 파일의 URL
 * @param {string} filename - 다운로드될 파일명 (선택)
 *
 * @example
 * triggerDownload('https://example.com/file.dmg', 'app.dmg')
 */
export function triggerDownload(url: string, filename?: string): void {
  // URL이 없으면 에러
  if (!url) {
    console.error('다운로드 URL이 설정되지 않았습니다.')
    return
  }

  // 새 창에서 다운로드
  const link = document.createElement('a')
  link.href = url
  link.download = filename || ''
  link.target = '_blank'
  link.rel = 'noopener noreferrer'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Google Analytics 이벤트를 전송합니다.
 *
 * @param {string} eventName - 이벤트 이름
 * @param {Record<string, any>} params - 이벤트 파라미터
 *
 * @example
 * trackEvent('download', { platform: 'mac', version: '1.0.0' })
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params)
  }
}

/**
 * 다운로드 이벤트를 트래킹하고 다운로드를 시작합니다.
 *
 * @param {Platform} platform - 다운로드할 플랫폼 ('mac' 또는 'windows')
 * @param {string} url - 다운로드 URL
 * @param {string} filename - 파일명
 * @param {string} version - 앱 버전
 *
 * @example
 * handleDownload('mac', 'https://...', 'app.dmg', '1.0.0')
 */
export function handleDownload(
  platform: Platform,
  url: string,
  filename: string,
  version: string
): void {
  // Google Analytics 이벤트 트래킹
  trackEvent('download', {
    platform,
    version,
    filename,
  })

  // 다운로드 트리거
  triggerDownload(url, filename)
}
