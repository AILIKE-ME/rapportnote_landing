import Link from 'next/link'
import Image from 'next/image'
import { CONTACT_EMAIL } from '@/lib/constants'

/**
 * 푸터 컴포넌트.
 *
 * 로고, 링크, 연락처 정보를 포함합니다.
 */
export function Footer() {
  return (
    <footer className="bg-warm-50 border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/landing/images/logo.svg"
                alt="RapportNote Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-gray-900 font-brand tracking-wide">RapportNote</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              AI를 활용한 실시간 상담 기록 서비스.
              <br />
              정확하고 빠른 음성 인식으로 상담 기록을 자동화합니다.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 AILIKE.ME Inc. All rights reserved.
            </p>
          </div>

          {/* 제품 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">제품</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-gray-600 hover:text-primary-700 transition-colors">
                  기능
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-600 hover:text-primary-700 transition-colors">
                  가격
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-700 transition-colors">
                  다운로드
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">회사</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-700 transition-colors">
                  문의
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-gray-600 hover:text-primary-700 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
