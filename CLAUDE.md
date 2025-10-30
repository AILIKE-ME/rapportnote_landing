# Claude Code 작업 가이드 - 랜딩 페이지

## 프로젝트 개요

RapportNote 랜딩 페이지 - Next.js + TypeScript + Tailwind CSS를 사용한 마케팅 웹사이트

- **기술 스택**: Next.js 14+, TypeScript, Tailwind CSS, React
- **주요 기능**: 서비스 소개, 기능 설명, 가격 안내, 문의 폼

## 핵심 원칙 (항상 준수)

1. **미니멀**: 필요한 것만 구현
2. **가독성**: 함수 최대 50줄, 중첩 depth 3단계
3. **의미 단위**: 하나의 함수는 하나의 책임
4. **주석 필수**: 모든 함수/클래스에 JSDoc
5. **테스트 우선**: TDD, 커버리지 80%+
6. **문서 최신화**: 코드 변경 시 관련 문서 즉시 업데이트
7. **성능 최적화**: 이미지 최적화, 코드 스플리팅, SEO

## 작업별 참고 문서

### 시작하기

| 작업 | 참고 문서 |
|------|----------|
| 프로젝트 설치 및 실행 | `README.md` ⭐ |
| TypeScript/React/Next.js 코딩 규칙 | `CODING_STANDARDS.md` ⭐ |
| 컴포넌트 작성 | `README.md` > 컴포넌트 가이드 |
| 페이지 추가 | `README.md` > 주요 기능 |

### 핵심 기능 개발

| 작업 | 참고 문서 |
|------|----------|
| 스타일링 (Tailwind CSS) | `README.md` > 스타일링 가이드 |
| 애니메이션 구현 | `README.md` > 애니메이션 |
| 폼 처리 | `README.md` > 폼 처리 |
| SEO 최적화 | `README.md` > SEO 최적화 |
| 성능 최적화 | `README.md` > 성능 최적화 |
| 배포 (Vercel) | `README.md` > 배포 |

### 주요 파일 수정

| 파일 | 설명 |
|------|------|
| `app/layout.tsx` | 루트 레이아웃, 메타데이터, Google Analytics |
| `app/page.tsx` | 홈페이지 (Hero, Features, Demo, CTA) |
| `components/layout/Header.tsx` | 네비게이션, 로고 |
| `components/sections/Hero.tsx` | 히어로 섹션 |
| `components/ui/Button.tsx` | 재사용 가능한 버튼 컴포넌트 |
| `lib/utils/index.ts` | 유틸리티 함수 (cn, 날짜 포맷 등) |
| `next.config.js` | Next.js 설정 (이미지 도메인, 환경 변수) |
| `tailwind.config.js` | Tailwind CSS 테마 설정 |

## 프로젝트 구조

```
rapportnote_landing/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # 전역 스타일
│   ├── about/                    # About 페이지
│   │   └── page.tsx
│   ├── pricing/                  # 가격 페이지
│   │   └── page.tsx
│   └── contact/                  # 문의 페이지
│       └── page.tsx
├── components/                   # 재사용 가능한 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/                 # 페이지 섹션
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Demo.tsx
│   │   └── CTA.tsx
│   └── ui/                       # UI 컴포넌트
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/                          # 유틸리티 및 헬퍼
│   ├── types/                    # TypeScript 타입 정의
│   │   └── index.ts
│   ├── utils/                    # 유틸리티 함수
│   │   └── index.ts
│   └── constants/                # 상수
│       └── index.ts
├── public/                       # 정적 파일
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── styles/                       # 추가 스타일
│   └── theme.ts                  # 테마 설정
├── tests/                        # 테스트
├── .env.local                    # 환경 변수 (Git 제외)
├── .env.example                  # 환경 변수 예시
├── next.config.js                # Next.js 설정
├── tsconfig.json                 # TypeScript 설정
├── package.json                  # 의존성
├── tailwind.config.js            # Tailwind CSS 설정
├── CLAUDE.md                     # 이 문서
├── CODING_STANDARDS.md           # 코딩 표준
└── README.md                     # 프로젝트 문서
```

## 코드 작성 전 체크리스트

- [ ] 관련 문서를 읽었는가?
- [ ] 테스트 코드를 먼저 작성했는가?
- [ ] 모든 함수에 JSDoc을 작성했는가?
- [ ] 성능 최적화를 고려했는가? (이미지 최적화, 코드 스플리팅)
- [ ] SEO 메타데이터를 추가했는가?
- [ ] 문서를 업데이트했는가?

## 빠른 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 테스트 실행
npm run test

# 코드 분석
npm run lint

# 타입 체크
npm run type-check

# 포맷팅
npm run format
```

## Import 경로 규칙

절대 경로 import를 위해 `@/` alias를 사용합니다:

```typescript
// ✅ 올바른 import (@ alias 사용)
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Feature } from '@/lib/types'

// ✅ 올바른 import (같은 디렉토리)
import { FeatureCard } from './FeatureCard'
import styles from './Hero.module.css'

// ❌ 잘못된 import
import { Button } from '../../../components/ui/Button'  // 상대 경로 지양 (@ alias 사용)
```

**tsconfig.json 설정:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 환경 변수 설정

```bash
# .env.local 파일 예시
NEXT_PUBLIC_API_URL=https://api.rapportnote.com
NEXT_PUBLIC_SITE_URL=https://rapportnote.com

# Google Analytics (선택사항)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 문의 폼 이메일
CONTACT_EMAIL=contact@rapportnote.com
```

## 개발 워크플로우

### 1. 새 페이지 추가

1. `app/{page_name}/page.tsx` 생성
2. 메타데이터 추가 (SEO)
3. 필요한 섹션 컴포넌트 작성
4. `components/layout/Header.tsx`에 네비게이션 링크 추가
5. 테스트 코드 작성
6. 문서 업데이트

### 2. 새 컴포넌트 추가

1. `components/` 하위 적절한 폴더에 컴포넌트 생성
2. TypeScript 타입 정의
3. Tailwind CSS로 스타일링
4. Storybook 스토리 작성 (선택사항)
5. 테스트 코드 작성
6. README 업데이트

### 3. 스타일 수정

1. `tailwind.config.js`에서 테마 설정 확인
2. 컴포넌트에서 Tailwind 클래스 사용
3. 복잡한 스타일은 CSS Module 또는 `globals.css` 사용
4. 반응형 디자인 확인 (모바일, 태블릿, 데스크톱)

## 컴포넌트 작성 패턴

### 기본 컴포넌트

```typescript
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

/**
 * 재사용 가능한 버튼 컴포넌트
 *
 * @param children - 버튼 내용
 * @param variant - 버튼 스타일 (primary | secondary)
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 CSS 클래스
 */
export function Button({
  children,
  variant = 'primary',
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        className
      )}
    >
      {children}
    </button>
  )
}
```

### 페이지 컴포넌트

```typescript
import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'

export const metadata: Metadata = {
  title: 'RapportNote - 심리상담 음성 전사 서비스',
  description: '심리상담 대화를 실시간으로 전사하는 AI 기반 서비스',
  openGraph: {
    title: 'RapportNote',
    description: '심리상담 음성 전사 서비스',
    images: ['/images/og-image.png'],
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  )
}
```

## Tailwind CSS 활용

### 유틸리티 클래스 결합

```typescript
import { cn } from '@/lib/utils'

// lib/utils/index.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 반응형 디자인

```typescript
<div className="
  grid
  grid-cols-1       /* 모바일 */
  md:grid-cols-2    /* 태블릿 */
  lg:grid-cols-3    /* 데스크톱 */
  gap-6
">
  {/* 콘텐츠 */}
</div>
```

### 다크 모드 지원

```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* 콘텐츠 */}
</div>
```

## SEO 최적화

### 메타데이터 설정

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'RapportNote',
    template: '%s | RapportNote',
  },
  description: '심리상담 음성 전사 서비스',
  keywords: ['심리상담', '음성 전사', 'AI', 'Gemini'],
  authors: [{ name: 'RapportNote Team' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://rapportnote.com',
    siteName: 'RapportNote',
  },
}
```

### 구조화된 데이터 (JSON-LD)

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'RapportNote',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
      },
    }),
  }}
/>
```

## 성능 최적화

### 이미지 최적화

```typescript
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // LCP 이미지에 사용
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### 동적 import

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,  // 클라이언트 전용 컴포넌트
})
```

### 폰트 최적화

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

## 테스트 작성

### 컴포넌트 테스트

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [React 공식 문서](https://react.dev/)

## 배포

Next.js 배포 가이드는 `DEPLOYMENT.md`를 참고하세요.

## 전체 프로젝트 문서

이 문서는 랜딩 페이지 레포지토리만 다룹니다. 전체 프로젝트 구조와 다른 레포지토리 정보는:

- **프로젝트 루트**: `../CLAUDE.md`
- **백엔드**: `../rapportnote_backend/CLAUDE.md`
- **프론트엔드**: `../rapportnote_frontend/CLAUDE.md`
