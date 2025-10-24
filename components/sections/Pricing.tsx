'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const plans = [
  {
    name: 'Basic',
    price: '₩0',
    period: '무료',
    description: '',
    features: [
      '실시간 대화 기록',
      '보고서 생성',
    ],
    cta: '시작하기',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₩29,000',
    period: '월',
    description: '',
    features: [
      'Basic의 모든 기능',
      '상담 히스토리 추적',
      '개인화된 보고서 형식',
    ],
    cta: '시작하기',
    popular: false,
  },
]

/**
 * Pricing 섹션 컴포넌트.
 *
 * 가격 플랜을 표시합니다 (UI만, 실제 결제 기능 없음).
 */
export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            간단하고 투명한 가격
          </h2>
        </motion.div>

        {/* 가격 플랜 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                plan.popular
                  ? 'border-2 border-primary-600 scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {/* 인기 배지 */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  가장 인기있는 플랜
                </div>
              )}

              {/* 플랜 이름 */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{plan.name}</h3>

              {/* 가격 */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== '맞춤형' && (
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  )}
                </div>
              </div>

              {/* CTA 버튼 */}
              <button
                className="w-full py-3 px-6 rounded-full font-semibold transition-all hover:scale-105 mb-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg"
              >
                {plan.cta}
              </button>

              {/* 기능 목록 */}
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <svg
                      className="w-6 h-6 text-primary-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* FAQ 링크 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            질문이 있으신가요?{' '}
            <a href="/contact" className="text-primary-700 hover:text-primary-800 font-semibold">
              고객 지원팀
            </a>
            에 문의하세요.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
