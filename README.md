# RapportNote 랜딩 페이지

RapportNote 서비스를 소개하는 공식 랜딩 페이지입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## 현재 구현된 페이지

- **홈페이지** (`/`): 서비스 소개 및 주요 기능
- **문의 페이지** (`/contact`): 연락처 폼

## 로컬 개발 환경

### 요구사항

- Node.js 18.x 이상
- npm (또는 yarn, pnpm)

### 설치 및 실행

```bash
# 1. 프로젝트 디렉토리로 이동
cd rapportnote_landing

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행 (포트 3000)
npm run dev

# 4. 다른 포트로 실행
PORT=3001 npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 타입 체크 및 코드 품질

```bash
# TypeScript 타입 체크
npm run type-check

# Watch 모드 (파일 변경 시 자동 체크)
npm run type-check:watch

# 코드 포맷팅
npm run format
```

## 서버 배포 (PM2)

현재 자체 서버에서 PM2를 사용하여 프로덕션 배포 중입니다.

### 서버 환경 설정

```bash
# 서버에 SSH 접속
ssh user@your-server-ip

# 프로젝트 디렉토리로 이동
cd /path/to/rapportnote/rapportnote_landing

# 의존성 설치
npm install

# 프로덕션 빌드
npm run build
```

### PM2로 실행

```bash
# PM2로 앱 시작 (프로세스 이름: rapportnote-landing)
pm2 start npm --name "rapportnote-landing" -- start

# 서버 재시작 시 자동 실행 설정
pm2 startup
pm2 save
```

### PM2 관리 명령어

```bash
# 프로세스 상태 확인
pm2 status

# 프로세스 리스트
pm2 list

# 앱 재시작
pm2 restart rapportnote-landing

# 앱 중지
pm2 stop rapportnote-landing

# 앱 삭제
pm2 delete rapportnote-landing

# 모든 프로세스 재시작
pm2 restart all
```

### PM2 로그 확인

```bash
# 실시간 로그 확인
pm2 logs rapportnote-landing

# 최근 100줄 로그 확인
pm2 logs rapportnote-landing --lines 100

# 에러 로그만 확인
pm2 logs rapportnote-landing --err

# 표준 출력 로그만 확인
pm2 logs rapportnote-landing --out

# 모든 프로세스 로그
pm2 logs

# 로그 초기화
pm2 flush
```

### PM2 모니터링

```bash
# 실시간 모니터링 대시보드 (CPU, 메모리 사용량)
pm2 monit

# 프로세스 상세 정보
pm2 show rapportnote-landing

# 메모리 사용량 확인
pm2 list
```

### 코드 업데이트 시 배포

```bash
# 서버에 SSH 접속
ssh user@your-server-ip

# 프로젝트 디렉토리로 이동
cd /path/to/rapportnote/rapportnote_landing

# Git에서 최신 코드 pull
git pull origin main

# 의존성 업데이트 (package.json 변경 시)
npm install

# 프로덕션 빌드
npm run build

# PM2로 재시작 (무중단 재시작)
pm2 restart rapportnote-landing

# 로그 확인 (정상 시작 확인)
pm2 logs rapportnote-landing --lines 50
```

## 문제 해결

### 서버 문제

#### PM2 프로세스가 시작되지 않는 경우

```bash
# PM2 상태 확인
pm2 status

# 상세 에러 로그 확인
pm2 logs rapportnote-landing --err --lines 100

# Node.js 버전 확인 (v18 이상 필요)
node --version

# 수동으로 직접 실행해보기
cd /path/to/rapportnote/rapportnote_landing
npm run start
```

#### 포트 충돌

```bash
# 포트 3000 사용 중인 프로세스 확인
lsof -i :3000

# 해당 프로세스 종료
kill -9 [PID]

# PM2 프로세스 완전 재시작
pm2 delete rapportnote-landing
pm2 start npm --name "rapportnote-landing" -- start
```

#### 빌드 실패

```bash
# node_modules 및 캐시 삭제 후 재설치
rm -rf node_modules .next
npm install
npm run build
```

#### 메모리 부족

```bash
# PM2 프로세스 메모리 확인
pm2 list

# 메모리 초과 시 재시작
pm2 restart rapportnote-landing

# 서버 전체 메모리 확인
free -h
```

### 로컬 개발 문제

#### 타입 에러

```bash
# TypeScript 타입 체크
npm run type-check

# 출력 예시:
# app/page.tsx:15:7 - error TS2322: Type 'string' is not assignable to type 'number'.
```

#### 캐시 문제

```bash
# Next.js 캐시 삭제
rm -rf .next

# 전체 재빌드
npm run build
```

#### 포트 사용 중 (로컬)

```bash
# 다른 포트 사용
PORT=3001 npm run dev

# 프로세스 종료 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

## 환경 변수 (선택사항)

현재는 환경 변수 없이도 실행 가능합니다. 필요 시 서버의 프로젝트 디렉토리에 `.env.local` 파일을 생성하여 설정:

```bash
# 서버에서 환경 변수 파일 생성
cd /path/to/rapportnote/rapportnote_landing
nano .env.local
```

```.env
# Google Analytics (프로덕션 배포 시)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API 엔드포인트 (백엔드 연동 시)
NEXT_PUBLIC_API_URL=http://localhost:8000

# 연락처 이메일
NEXT_PUBLIC_CONTACT_EMAIL=hrpark@ailike.me
```

환경 변수 변경 후 재빌드 및 재시작 필요:

```bash
npm run build
pm2 restart rapportnote-landing
```

## 관련 문서

- **배포 가이드**: `../DEPLOYMENT.md` - 전체 배포 프로세스 (Nginx, HTTPS 설정 등)
- **코딩 표준**: `./CODING_STANDARDS.md` - TypeScript/React 코딩 규칙
- **개발 가이드**: `../DEVELOPMENT_GUIDE.md` - 전체 프로젝트 개발 가이드
- **공통 규칙**: `../CONTRIBUTING.md` - 프로젝트 공통 개발 규칙
