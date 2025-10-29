# Gmail OAuth 2.0 설정 가이드

RapportNote 랜딩페이지의 문의하기 기능은 Gmail OAuth 2.0을 사용하여 이메일을 전송합니다.
이 가이드는 Google Cloud Console에서 OAuth 2.0 자격 증명을 설정하는 방법을 안내합니다.

## 목차

1. [Google Cloud 프로젝트 생성](#1-google-cloud-프로젝트-생성)
2. [Gmail API 활성화](#2-gmail-api-활성화)
3. [OAuth 동의 화면 구성](#3-oauth-동의-화면-구성)
4. [OAuth 2.0 클라이언트 ID 생성](#4-oauth-20-클라이언트-id-생성)
5. [Refresh Token 발급](#5-refresh-token-발급)
6. [환경 변수 설정](#6-환경-변수-설정)

---

## 1. Google Cloud 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단의 프로젝트 선택 드롭다운 클릭
3. **새 프로젝트** 클릭
4. 프로젝트 이름 입력 (예: `rapportnote-landing`)
5. **만들기** 클릭

---

## 2. Gmail API 활성화

1. 왼쪽 메뉴에서 **API 및 서비스** > **라이브러리** 클릭
2. 검색창에 `Gmail API` 검색
3. **Gmail API** 클릭
4. **사용 설정** 클릭

---

## 3. OAuth 동의 화면 구성

1. 왼쪽 메뉴에서 **API 및 서비스** > **OAuth 동의 화면** 클릭
2. 사용자 유형 선택:
   - **외부** 선택 (개인 Gmail 계정 사용 시)
   - **만들기** 클릭
3. 앱 정보 입력:
   - **앱 이름**: RapportNote
   - **사용자 지원 이메일**: 본인 Gmail 주소
   - **개발자 연락처 정보**: 본인 Gmail 주소
4. **저장 후 계속** 클릭
5. 범위 단계에서 **범위 추가 또는 삭제** 클릭:
   - 필터에 `gmail` 검색
   - `https://www.googleapis.com/auth/gmail.compose` 선택
     - 설명: "Manage drafts and send emails"
   - **업데이트** 클릭
6. **저장 후 계속** 클릭
7. 테스트 사용자 추가:
   - **테스트 사용자 추가** 클릭
   - 본인 Gmail 주소 입력
   - **저장** 클릭
8. **대시보드로 돌아가기** 클릭

---

## 4. OAuth 2.0 클라이언트 ID 생성

1. 왼쪽 메뉴에서 **API 및 서비스** > **사용자 인증 정보** 클릭
2. **사용자 인증 정보 만들기** > **OAuth 클라이언트 ID** 클릭
3. 애플리케이션 유형 선택:
   - **데스크톱 앱** 선택
   - 이름: `RapportNote Desktop` (아무거나 입력)
4. **만들기** 클릭
5. 생성된 클라이언트 ID와 클라이언트 보안 비밀번호 복사:
   - **클라이언트 ID**: `xxxxx.apps.googleusercontent.com`
   - **클라이언트 보안 비밀번호**: `GOCSPX-xxxxx`
   - 안전한 곳에 저장해두세요!
6. **확인** 클릭

---

## 5. Refresh Token 발급

OAuth 2.0은 액세스 토큰이 만료되면 Refresh Token을 사용하여 자동으로 갱신합니다.
아래 스크립트를 사용하여 Refresh Token을 발급받으세요.

### 5.1. 토큰 발급 스크립트 생성

`rapportnote_landing` 폴더에 `get-refresh-token.js` 파일을 생성하고 아래 내용을 복사하세요:

```javascript
const { google } = require('googleapis')
const readline = require('readline')

// 4단계에서 받은 클라이언트 ID와 시크릿을 입력하세요
const CLIENT_ID = 'YOUR_CLIENT_ID'
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

// Gmail 전송 권한 요청 (compose = 초안 작성 + 전송)
const SCOPES = ['https://www.googleapis.com/auth/gmail.compose']

// 1단계: 인증 URL 생성
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
})

console.log('아래 URL을 브라우저에서 열어 인증을 진행하세요:')
console.log(authUrl)
console.log('\n')

// 2단계: 인증 코드 입력 받기
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('인증 후 받은 코드를 입력하세요: ', async (code) => {
  try {
    // 3단계: 인증 코드로 토큰 교환
    const { tokens } = await oauth2Client.getToken(code)

    console.log('\n=== 환경 변수에 설정할 값 ===')
    console.log(`GMAIL_CLIENT_ID=${CLIENT_ID}`)
    console.log(`GMAIL_CLIENT_SECRET=${CLIENT_SECRET}`)
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`)
    console.log('===========================\n')

    console.log('위 값들을 .env 파일에 복사하세요!')
  } catch (error) {
    console.error('토큰 발급 실패:', error)
  }

  rl.close()
})
```

### 5.2. CLIENT_ID와 CLIENT_SECRET 입력

`get-refresh-token.js` 파일을 열어서:
- `YOUR_CLIENT_ID` → 4단계에서 복사한 클라이언트 ID로 교체
- `YOUR_CLIENT_SECRET` → 4단계에서 복사한 클라이언트 보안 비밀번호로 교체

### 5.3. 스크립트 실행

```bash
# rapportnote_landing 폴더에서 실행
node get-refresh-token.js
```

### 5.4. 인증 진행

1. 터미널에 출력된 URL을 복사하여 브라우저에서 열기
2. Google 계정 선택 (테스트 사용자로 추가한 계정)
3. **고급** 클릭 > **RapportNote(안전하지 않음)로 이동** 클릭
4. **계속** 클릭
5. 권한 승인 후 나타나는 **인증 코드** 복사
6. 터미널에 인증 코드 붙여넣기

### 5.5. 결과 확인

터미널에 다음과 같은 형식으로 출력됩니다:

```
=== 환경 변수에 설정할 값 ===
GMAIL_CLIENT_ID=xxxxx.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=GOCSPX-xxxxx
GMAIL_REFRESH_TOKEN=1//xxxxx
===========================
```

---

## 6. 환경 변수 설정

`.env` 파일에 다음 환경 변수를 추가하세요:

```bash
# Gmail OAuth 2.0 설정
GMAIL_CLIENT_ID=xxxxx.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=GOCSPX-xxxxx
GMAIL_REFRESH_TOKEN=1//xxxxx

# 문의 수신 이메일 (관리자)
NEXT_PUBLIC_EMAIL_USER=your-email@gmail.com
```

### 환경 변수 설명

- `GMAIL_CLIENT_ID`: Google Cloud Console에서 생성한 OAuth 2.0 클라이언트 ID
- `GMAIL_CLIENT_SECRET`: OAuth 2.0 클라이언트 보안 비밀번호
- `GMAIL_REFRESH_TOKEN`: 5단계에서 발급받은 Refresh Token
- `NEXT_PUBLIC_EMAIL_USER`: 문의를 받을 Gmail 주소 (관리자)

---

## 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000/contact 접속
# 문의 폼 작성 후 전송
```

정상적으로 설정되었다면:
- 관리자 이메일로 문의 내용이 전송됩니다
- 문의자 이메일로 자동 응답이 전송됩니다

---

## 문제 해결

### 인증 오류 발생 시

1. Google Cloud Console에서 **OAuth 동의 화면** > **테스트 사용자**에 본인 Gmail이 추가되어 있는지 확인
2. `GMAIL_REFRESH_TOKEN`이 정확히 복사되었는지 확인 (공백 없이)
3. Gmail API가 활성화되어 있는지 확인

### "앱이 확인되지 않음" 오류

- 테스트 단계에서는 정상입니다
- **고급** > **RapportNote(안전하지 않음)로 이동** 클릭하여 진행

### Refresh Token이 발급되지 않음

- `get-refresh-token.js`의 `access_type: 'offline'` 옵션이 있는지 확인
- 이미 한 번 인증한 경우, Google 계정 설정에서 앱 액세스 권한을 제거하고 다시 시도

---

## 보안 주의사항

⚠️ **절대 Git에 커밋하지 마세요!**

- `.env` 파일은 `.gitignore`에 포함되어 있습니다
- `GMAIL_CLIENT_SECRET`과 `GMAIL_REFRESH_TOKEN`은 절대 공개하지 마세요
- 토큰이 유출된 경우 Google Cloud Console에서 즉시 삭제하세요

---

## 참고 자료

- [Google OAuth 2.0 문서](https://developers.google.com/identity/protocols/oauth2)
- [Gmail API 문서](https://developers.google.com/gmail/api)
- [googleapis npm 패키지](https://www.npmjs.com/package/googleapis)
