# 랜딩 페이지 코딩 표준 (TypeScript/React/Next.js)

## 기본 원칙

**공통 규칙은 [`CONTRIBUTING.md`](../CONTRIBUTING.md)를 따릅니다.**

이 문서는 TypeScript/React/Next.js 프로젝트에 특화된 규칙을 다룹니다.

## TypeScript 스타일 가이드

### 기본 규칙

- **들여쓰기**: 스페이스 2칸
- **최대 줄 길이**: 100자
- **인코딩**: UTF-8
- **따옴표**: 문자열은 작은따옴표(`'`) 또는 큰따옴표(`"`) 일관성 있게 사용
- **세미콜론**: 항상 사용

### Import 순서

```typescript
// 1. React 및 Next.js
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. 서드파티 라이브러리
import clsx from 'clsx'
import { motion } from 'framer-motion'

// 3. 로컬 컴포넌트
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'

// 4. 유틸리티 및 타입
import { cn } from '@/lib/utils'
import type { Feature } from '@/lib/types'

// 5. 스타일
import styles from './Hero.module.css'
```

### 네이밍 규칙

```typescript
// 컴포넌트: PascalCase
export function HeroSection() {}
export const FeatureCard = () => {}

// 변수/함수: camelCase
const userName = 'John'
function handleClick() {}

// 상수: UPPER_SNAKE_CASE
const MAX_ITEMS = 10
const API_BASE_URL = 'https://api.example.com'

// 타입/인터페이스: PascalCase
type User = {}
interface ButtonProps {}

// Private/내부: 앞에 언더스코어
const _internalHelper = () => {}

// 파일명
// - 컴포넌트: PascalCase (Button.tsx, HeroSection.tsx)
// - 유틸리티: camelCase (formatDate.ts, apiClient.ts)
// - 타입: camelCase (index.ts, types.ts)
```

## Type 정의 필수

모든 함수, 변수, Props에 타입을 명시합니다.

```typescript
// ✅ 좋은 예
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant], styles[size])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// ✅ 좋은 예: 함수 타입
function calculatePrice(
  basePrice: number,
  discount: number = 0
): number {
  return basePrice * (1 - discount)
}

// ❌ 나쁜 예: 타입 없음
function Button({ children, variant, onClick }) {
  return <button onClick={onClick}>{children}</button>
}
```

## JSDoc 주석 규칙

### 컴포넌트 주석

```typescript
/**
 * 기능 카드 컴포넌트.
 *
 * RapportNote의 주요 기능을 시각적으로 표현합니다.
 *
 * @param {FeatureCardProps} props - 컴포넌트 속성
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   title="실시간 전사"
 *   description="Gemini API를 통한 정확한 음성 인식"
 *   icon={<MicrophoneIcon />}
 * />
 * ```
 */
export function FeatureCard({
  title,
  description,
  icon
}: FeatureCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
```

### 함수 주석

```typescript
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
```

## React 컴포넌트 규칙

### 함수형 컴포넌트 사용

```typescript
// ✅ 좋은 예: 함수형 컴포넌트
export function Header() {
  return <header>...</header>
}

// ✅ 좋은 예: Arrow function (간단한 컴포넌트)
export const Logo = () => <img src="/logo.svg" alt="RapportNote" />

// ❌ 나쁜 예: 클래스 컴포넌트 (특별한 이유 없이 사용 금지)
class Header extends React.Component {
  render() {
    return <header>...</header>
  }
}
```

### 컴포넌트 구조

```typescript
// 1. Import
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { User } from '@/lib/types'

// 2. Types/Interfaces
interface UserProfileProps {
  user: User
  onEdit?: () => void
}

// 3. Component
export function UserProfile({ user, onEdit }: UserProfileProps) {
  // 3-1. Hooks
  const [isEditing, setIsEditing] = useState(false)

  // 3-2. Event handlers
  const handleEdit = () => {
    setIsEditing(true)
    onEdit?.()
  }

  // 3-3. Effects
  useEffect(() => {
    // 초기화 로직
  }, [])

  // 3-4. Render helpers
  const renderActions = () => {
    if (!isEditing) return null
    return <Button onClick={handleEdit}>Edit</Button>
  }

  // 3-5. Return
  return (
    <div>
      <h2>{user.name}</h2>
      {renderActions()}
    </div>
  )
}

// 4. 보조 함수/상수 (컴포넌트 외부)
const DEFAULT_AVATAR = '/images/default-avatar.png'

function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
```

### Props 타입 정의

```typescript
// ✅ 좋은 예: interface 사용 (확장 가능)
interface CardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

// ✅ 좋은 예: type 사용 (유니온/인터섹션)
type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

type ButtonProps = BaseButtonProps & {
  variant?: ButtonVariant
  size?: ButtonSize
}

// ✅ 좋은 예: React 내장 타입 활용
import type { HTMLAttributes } from 'react'

interface CustomDivProps extends HTMLAttributes<HTMLDivElement> {
  customProp?: string
}
```

### Hooks 규칙

```typescript
// ✅ 좋은 예: 커스텀 Hook
/**
 * 윈도우 크기를 추적하는 Hook.
 *
 * @returns {Object} 윈도우 너비와 높이
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// ✅ 좋은 예: Hook 사용
export function ResponsiveComponent() {
  const { width } = useWindowSize()
  const isMobile = width < 768

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}

// ❌ 나쁜 예: 조건부 Hook 호출
function BadComponent({ shouldUseHook }) {
  if (shouldUseHook) {
    const data = useCustomHook() // 🚫 조건문 안에서 Hook 호출
  }
}
```

## Next.js 규칙

### App Router 구조

```typescript
// app/page.tsx - 홈페이지
export default function HomePage() {
  return <main>...</main>
}

// app/about/page.tsx - About 페이지
export default function AboutPage() {
  return <main>...</main>
}

// app/layout.tsx - 루트 레이아웃
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
```

### Metadata 정의

```typescript
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RapportNote - 실시간 상담 전사 서비스',
  description: 'Gemini API를 활용한 정확하고 빠른 심리상담 대화 전사',
  openGraph: {
    title: 'RapportNote',
    description: '실시간 상담 전사 서비스',
    images: ['/og-image.png'],
  },
}

export default function HomePage() {
  return <main>...</main>
}
```

### Server vs Client Components

```typescript
// ✅ 좋은 예: Server Component (기본)
// app/components/Features.tsx
export function Features() {
  // 서버에서 렌더링, 번들 사이즈 감소
  return <section>...</section>
}

// ✅ 좋은 예: Client Component (상태/이벤트 필요)
// app/components/ContactForm.tsx
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 폼 제출 로직
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

// ❌ 나쁜 예: 불필요한 Client Component
'use client' // 🚫 상태나 이벤트 핸들러 없는데 'use client' 사용

export function StaticContent() {
  return <div>This could be a server component</div>
}
```

### Image 최적화

```typescript
import Image from 'next/image'

// ✅ 좋은 예: Next.js Image 컴포넌트 사용
export function Hero() {
  return (
    <Image
      src="/images/hero.png"
      alt="RapportNote 히어로 이미지"
      width={1200}
      height={600}
      priority // LCP 이미지는 priority 설정
      placeholder="blur"
      blurDataURL="/images/hero-blur.png"
    />
  )
}

// ❌ 나쁜 예: 일반 img 태그
// <img src="/images/hero.png" alt="Hero" />
```

### Link 사용

```typescript
import Link from 'next/link'

// ✅ 좋은 예: Next.js Link 컴포넌트
export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/pricing">Pricing</Link>
    </nav>
  )
}

// ❌ 나쁜 예: a 태그 직접 사용 (내부 링크)
// <a href="/about">About</a>
```

## 스타일링

### Tailwind CSS 사용

```typescript
import { cn } from '@/lib/utils'

// ✅ 좋은 예: Tailwind + cn 유틸리티
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
}

export function Button({ variant = 'primary', className, children }: ButtonProps) {
  return (
    <button
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

### CSS Modules (옵션)

```typescript
// Hero.module.css
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.title {
  font-size: 3rem;
  font-weight: bold;
}

// Hero.tsx
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>RapportNote</h1>
    </section>
  )
}
```

## 상태 관리

### useState & useReducer

```typescript
// ✅ 좋은 예: 간단한 상태는 useState
export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// ✅ 좋은 예: 복잡한 상태는 useReducer
type State = {
  loading: boolean
  error: string | null
  data: any[]
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any[] }
  | { type: 'FETCH_ERROR'; error: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export function DataFetcher() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    data: [],
  })

  // ...
}
```

### Context API (전역 상태)

```typescript
// lib/contexts/ThemeContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## 에러 처리

### Error Boundary (Next.js)

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>문제가 발생했습니다!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}
```

### try-catch 사용

```typescript
async function fetchData(id: string): Promise<Data> {
  try {
    const response = await fetch(`/api/data/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}
```

## 성능 최적화

### React.memo 사용

```typescript
// ✅ 좋은 예: 비용이 큰 컴포넌트는 memo 사용
interface FeatureListProps {
  features: Feature[]
}

export const FeatureList = React.memo(function FeatureList({
  features
}: FeatureListProps) {
  return (
    <div>
      {features.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  )
})
```

### useMemo & useCallback

```typescript
export function ExpensiveComponent({ items }: { items: Item[] }) {
  // ✅ 좋은 예: 비용이 큰 계산은 useMemo
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  // ✅ 좋은 예: 자식에게 전달하는 콜백은 useCallback
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id)
  }, [])

  return (
    <div>
      {sortedItems.map((item) => (
        <ItemCard key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  )
}
```

### Dynamic Import (코드 분할)

```typescript
// ✅ 좋은 예: 무거운 컴포넌트는 동적 import
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // 클라이언트에서만 렌더링
})

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  )
}
```

## 테스트

### Jest + React Testing Library

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant class correctly', () => {
    const { container } = render(<Button variant="secondary">Click</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('secondary')
  })
})
```

## 환경 변수

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.rapportnote.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SECRET_KEY=secret-value

// lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  // 서버 전용 변수 (NEXT_PUBLIC_ 접두사 없음)
  secretKey: process.env.SECRET_KEY,
}

// 사용
import { config } from '@/lib/config'

const response = await fetch(`${config.apiUrl}/users`)
```

## 도구

### ESLint & Prettier

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}

// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

### 타입 체크

```bash
# TypeScript 타입 체크
npm run type-check

# 또는 watch 모드
npm run type-check:watch
```

## 참고 자료

- Next.js 문서: https://nextjs.org/docs
- React 문서: https://react.dev/
- TypeScript 문서: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
