'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * Hero 섹션 컴포넌트.
 *
 * 메인 헤드라인, Mac/Windows 다운로드 버튼을 포함합니다.
 */
export function Hero() {
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)

  const handleDownload = (platform: 'mac' | 'windows') => {
    setDownloadStatus(`${platform === 'mac' ? 'macOS' : 'Windows'} 다운로드 시작...`)
    // 실제 다운로드 로직
    setTimeout(() => {
      setDownloadStatus(null)
    }, 3000)
  }
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 배경 그래디언트 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* 데모 확인 버튼 */}
          <motion.a
            href="#demo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white border border-amber-200 rounded-full px-6 py-3 mb-8 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
            <span className="text-sm font-semibold text-amber-900">
              데모 확인하기 →
            </span>
          </motion.a>

          {/* 메인 헤드라인 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            마음을 다루는 심리상담,
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              대화에만 온전히 집중하세요
            </span>
          </motion.h1>

          {/* 서브 헤드라인 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            실시간 AI 음성 인식으로 상담 내용을 정확하게 기록합니다.
            <br />
            상담 내용을 바탕으로 원하는 형식의 보고서를 자동으로 생성합니다.
          </motion.p>

          {/* 다운로드 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* macOS 다운로드 */}
            <button
              onClick={() => handleDownload('mac')}
              className="group relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 font-semibold text-lg shadow-2xl hover:shadow-3xl flex items-center space-x-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Mac 다운로드</span>
            </button>

            {/* Windows 다운로드 */}
            <button
              onClick={() => handleDownload('windows')}
              className="group relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 font-semibold text-lg shadow-lg flex items-center space-x-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              <span>Windows 다운로드</span>
            </button>
          </motion.div>

          {/* 다운로드 상태 메시지 */}
          {downloadStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-full px-6 py-3">
                <svg className="w-5 h-5 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-amber-900 font-medium">{downloadStatus}</span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}
