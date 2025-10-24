'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Demo 섹션 컴포넌트.
 *
 * 제품 데모 및 스크린샷을 표시합니다.
 */
export function Demo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            실제로 어떻게 작동하나요?
          </h2>
        </motion.div>

        {/* 스텝 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {[
            {
              title: '대화 기록',
              description: '상담중 대화 내용을 실시간으로 기록해요',
            },
            {
              title: '보고서 생성',
              description: '대화내용을 바탕으로 원하는 형식의 보고서를 생성해요',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 데모 이미지 (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
        >
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-video flex items-center justify-center">
            {/* Placeholder for demo screenshot/video */}
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🖥️</div>
              <p className="text-2xl font-semibold text-gray-700 mb-2">앱 스크린샷</p>
              <p className="text-gray-500">실제 작동 화면이 여기에 표시됩니다</p>
            </div>
          </div>

          {/* 화면 프레임 장식 */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
