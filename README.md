# RapportNote 랜딩 페이지

RapportNote 서비스를 소개하는 공식 랜딩 페이지입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI / Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library

## 프로젝트 구조

```
rapportnote_landing/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # 전역 스타일
│   ├── about/                    # About 페이지
│   ├── pricing/                  # 가격 페이지
│   └── contact/                  # 문의 페이지
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
│   ├── utils/                    # 유틸리티 함수
│   └── constants/                # 상수
├── public/                       # 정적 파일
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── styles/                       # 추가 스타일
│   └── theme.ts                  # 테마 설정
└── tests/                        # 테스트
```

## 시작하기

### 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd rapportnote_landing

# 의존성 설치
npm install
# 또는
yarn install
```

### 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성합니다:

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 필요한 환경 변수를 설정합니다:

```env
# API 엔드포인트
NEXT_PUBLIC_API_URL=https://api.rapportnote.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 기타 설정
NEXT_PUBLIC_CONTACT_EMAIL=hrpark@ailike.me
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm run start
```

### 테스트

```bash
# 모든 테스트 실행
npm run test

# Watch 모드로 테스트
npm run test:watch

# 커버리지 확인
npm run test:coverage
```

### 코드 품질

```bash
# ESLint 실행
npm run lint

# Prettier로 코드 포맷팅
npm run format

# TypeScript 타입 체크
npm run type-check
```

## 주요 기능

### 1. 홈페이지 (/)

- Hero 섹션: RapportNote 소개
- Features 섹션: 주요 기능 소개
- Demo 섹션: 서비스 데모 영상
- CTA 섹션: 시작하기 버튼

### 2. About 페이지 (/about)

- 서비스 비전 및 미션
- 팀 소개

### 3. Pricing 페이지 (/pricing)

- 요금제 비교
- FAQ

### 4. Contact 페이지 (/contact)

- 문의 폼
- 이메일, 전화번호 등 연락처

## 컴포넌트 가이드

### Button 컴포넌트

```tsx
import { Button } from '@/components/ui/Button'

// 기본 사용
<Button>Click me</Button>

// Variant 및 Size
<Button variant="primary" size="md">Primary</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="outline" size="sm">Outline</Button>

// onClick 핸들러
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>

// Disabled
<Button disabled>Disabled</Button>
```

### Card 컴포넌트

```tsx
import { Card } from '@/components/ui/Card'

<Card>
  <h3>Title</h3>
  <p>Content goes here</p>
</Card>
```

### FeatureCard 컴포넌트

```tsx
import { FeatureCard } from '@/components/sections/Features'

<FeatureCard
  title="실시간 전사"
  description="Gemini API를 통한 정확한 음성 인식"
  icon={<MicrophoneIcon />}
/>
```

## 스타일링 가이드

### Tailwind CSS 사용

```tsx
// 기본 사용
<div className="flex items-center justify-center h-screen bg-gray-100">
  <h1 className="text-4xl font-bold text-blue-600">RapportNote</h1>
</div>

// cn 유틸리티로 조건부 클래스
import { cn } from '@/lib/utils'

<button
  className={cn(
    'px-4 py-2 rounded-lg',
    isActive && 'bg-blue-600 text-white',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Button
</button>
```

### 반응형 디자인

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
</div>

<h1 className="text-2xl md:text-4xl lg:text-6xl">
  {/* 모바일: 2xl, 태블릿: 4xl, 데스크톱: 6xl */}
  RapportNote
</h1>
```

## 애니메이션

### Framer Motion 사용

```tsx
import { motion } from 'framer-motion'

export function AnimatedSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Animated Content</h2>
    </motion.div>
  )
}

// Scroll 기반 애니메이션
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function ScrollAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <p>This animates when scrolled into view</p>
    </motion.div>
  )
}
```

## 폼 처리

### React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 스키마 정의
const contactSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('유효한 이메일을 입력해주세요'),
  message: z.string().min(10, '메시지는 최소 10자 이상이어야 합니다'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data)
    // API 호출
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="이름" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="이메일" type="email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <textarea {...register('message')} placeholder="메시지" />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>

      <button type="submit">제출</button>
    </form>
  )
}
```

## SEO 최적화

### Metadata 설정

```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RapportNote - 실시간 상담 전사 서비스',
  description: 'Gemini API를 활용한 정확하고 빠른 심리상담 대화 전사',
  keywords: ['심리상담', '전사', 'Gemini API', '실시간 녹음'],
  openGraph: {
    title: 'RapportNote',
    description: '실시간 상담 전사 서비스',
    url: 'https://rapportnote.com',
    siteName: 'RapportNote',
    images: [
      {
        url: 'https://rapportnote.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RapportNote',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RapportNote',
    description: '실시간 상담 전사 서비스',
    images: ['https://rapportnote.com/twitter-image.png'],
  },
}
```

### sitemap.xml 생성

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://rapportnote.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://rapportnote.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://rapportnote.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

## 성능 최적화

### 이미지 최적화

```tsx
import Image from 'next/image'

// 정적 이미지
<Image
  src="/images/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority // LCP 이미지
/>

// 외부 이미지
<Image
  src="https://example.com/image.png"
  alt="External"
  width={800}
  height={400}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

```tsx
import dynamic from 'next/dynamic'

// 무거운 컴포넌트는 동적 import
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // 클라이언트에서만 렌더링
})
```

## 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 환경 변수 설정

Vercel 대시보드에서 환경 변수를 설정합니다:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## 모니터링

### Google Analytics

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 트러블슈팅

### 빌드 에러

**문제**: `Module not found` 에러

**해결**:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

**문제**: TypeScript 타입 에러

**해결**:
```bash
# 타입 체크 실행
npm run type-check

# tsconfig.json 확인
```

### 개발 서버 에러

**문제**: 포트 이미 사용 중

**해결**:
```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

## 문서

- [코딩 표준](./CODING_STANDARDS.md)
- [전체 개발 가이드](../DEVELOPMENT_GUIDE.md)
- [공통 규칙](../CONTRIBUTING.md)

## 라이센스

MIT License
