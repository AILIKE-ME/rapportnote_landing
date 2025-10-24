'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'

/**
 * 헤더 컴포넌트.
 *
 * 로고, 네비게이션, CTA 버튼을 포함합니다.
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false)
  const [mobileDownloadDropdownOpen, setMobileDownloadDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileDropdownRef = useRef<HTMLDivElement>(null)

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDownloadDropdownOpen(false)
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setMobileDownloadDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-brand">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900 font-brand tracking-wide">RapportNote</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-700 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-700 hover:text-primary-700 transition-colors font-medium cursor-not-allowed opacity-50"
              disabled
            >
              로그인
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 font-medium shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>다운로드</span>
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform",
                    downloadDropdownOpen && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {downloadDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl bg-white border border-gray-200 overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setDownloadDropdownOpen(false)
                      // Mac 다운로드 로직
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-amber-50 transition-colors flex items-center space-x-3 group"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="font-semibold text-gray-900 group-hover:text-amber-600">Mac 다운로드</div>
                  </button>
                  <button
                    onClick={() => {
                      setDownloadDropdownOpen(false)
                      // Windows 다운로드 로직
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-amber-50 transition-colors flex items-center space-x-3 group border-t border-gray-100"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                    <div className="font-semibold text-gray-900 group-hover:text-amber-600">Windows 다운로드</div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 mt-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-700 hover:text-primary-700 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="block text-gray-700 transition-colors font-medium py-2 cursor-not-allowed opacity-50 w-full text-left"
              disabled
            >
              로그인
            </button>
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setMobileDownloadDropdownOpen(!mobileDownloadDropdownOpen)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all text-center font-medium shadow-lg flex items-center justify-center space-x-2"
              >
                <span>다운로드</span>
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform",
                    mobileDownloadDropdownOpen && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDownloadDropdownOpen && (
                <div className="mt-2 rounded-2xl shadow-xl bg-white border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => {
                      setMobileDownloadDropdownOpen(false)
                      setMobileMenuOpen(false)
                      // Mac 다운로드 로직
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-amber-50 transition-colors flex items-center space-x-3 group"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="font-semibold text-gray-900 group-hover:text-amber-600">Mac 다운로드</div>
                  </button>
                  <button
                    onClick={() => {
                      setMobileDownloadDropdownOpen(false)
                      setMobileMenuOpen(false)
                      // Windows 다운로드 로직
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-amber-50 transition-colors flex items-center space-x-3 group border-t border-gray-100"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                    <div className="font-semibold text-gray-900 group-hover:text-amber-600">Windows 다운로드</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
