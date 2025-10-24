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
