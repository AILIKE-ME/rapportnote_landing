'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    id: 2,
    icon: '⚡',
    title: '빠른 처리 속도',
    description: '실시간으로 상담 중 대화내용이 기록돼요. 이전 대화 내용을 기억하려고 노력하지 않고 현재 대화에만 집중할 수 있어요.',
  },
  {
    id: 3,
    icon: '🔒',
    title: '보안 및 프라이버시',
    description: '상담 기록은 서버에 저장하지 않고 로컬 기기에만 저장해요. 개발자도 몰래 볼 수 없어요.',
  },
  {
    id: 5,
    icon: '🎯',
    title: '높은 정확도',
    description: '단순히 음성만을 인식하는게 아니라 대화 내용을 이해하는 AI 언어 모델을 통해 높은 인식 정확도를 제공합니다.',
  },
]

/**
 * Features 섹션 컴포넌트.
 *
 * 주요 기능들을 카드 형태로 표시합니다.
 */
export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            강력한 기능들
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            상담에 특화된 기능으로 상담에만 집중하실 수 있게 도와드려요
          </p>
        </motion.div>

        {/* 기능 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-105 border border-gray-100"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
