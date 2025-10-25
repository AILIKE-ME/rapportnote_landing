'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { handleDownload as triggerDownload, type Platform } from '@/lib/utils'
import { DOWNLOAD_URLS, DOWNLOAD_FILENAMES, APP_VERSION, DOWNLOAD_AVAILABLE } from '@/lib/constants'

/**
 * CTA 섹션 컴포넌트.
 *
 * 사용자 행동을 유도하는 Call-to-Action 섹션입니다.
 */
export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [userPlatform, setUserPlatform] = useState<Platform>('mac')

  // 사용자의 OS 감지
  useEffect(() => {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('win')) {
      setUserPlatform('windows')
    } else {
      setUserPlatform('mac')
    }
  }, [])

  const handleDownload = () => {
    // 다운로드 가능 여부 확인
    if (!DOWNLOAD_AVAILABLE[userPlatform]) {
      alert(`${userPlatform === 'mac' ? 'macOS' : 'Windows'} 버전은 준비 중입니다.`)
      return
    }

    triggerDownload(
      userPlatform,
      DOWNLOAD_URLS[userPlatform],
      DOWNLOAD_FILENAMES[userPlatform],
      APP_VERSION
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative p-12 sm:p-16 text-center">
            {/* 헤드라인 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              지금 바로 시작하세요
            </motion.h2>

            {/* 서브 헤드라인 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              신용카드 정보 없이 무료로 시작할 수 있습니다.
              <br />
              7일 무료 체험 후 언제든지 취소 가능합니다.
            </motion.p>

            {/* CTA 버튼들 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleDownload}
                className="bg-white text-amber-700 px-8 py-4 rounded-full hover:bg-warm-50 transition-all hover:scale-105 font-semibold text-lg shadow-lg flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>
                  {userPlatform === 'mac' ? 'Mac' : 'Windows'} 다운로드
                </span>
              </button>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all hover:scale-105 font-semibold text-lg"
              >
                영업팀 문의
              </a>
            </motion.div>

            {/* 신뢰 마크 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center justify-center space-x-6 text-sm text-white/80"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>신용카드 필요 없음</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>7일 무료 체험</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>언제든지 취소 가능</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
