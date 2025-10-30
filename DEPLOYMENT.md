# RapportNote 배포 가이드

## 목차
- [랜딩 페이지 배포 (Next.js)](#랜딩-페이지-배포-nextjs)
- [macOS 앱 배포](#빠른-시작-macos)

---

## 랜딩 페이지 배포 (Next.js)

### Google Cloud 서버에 Git Clone으로 배포하기

#### 1. 서버 환경 준비

SSH로 서버에 접속:
```bash
ssh [사용자명]@[서버IP]
```

**Node.js 설치 (v18 이상 필요):**
```bash
# Node.js 버전 확인
node --version

# 없거나 버전이 낮다면 nvm으로 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20
```

**PM2 설치 (프로세스 관리):**
```bash
npm install -g pm2
```

#### 2. 프로젝트 Clone 및 설정

```bash
# 원하는 위치로 이동
cd ~
# 또는 cd /var/www

# Git 저장소 클론
git clone https://github.com/your-username/rapportnote.git
cd rapportnote/rapportnote_landing

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
nano .env  # 또는 vim .env
```

**.env 파일 설정:**
```env
# 프로덕션 환경 설정
NODE_ENV=production

# API URL (백엔드 주소)
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# 기타 필요한 환경 변수
```

#### 3. 빌드 및 실행

```bash
# 프로덕션 빌드
npm run build

# PM2로 앱 시작
pm2 start npm --name "rapportnote-landing" -- start

# 서버 재시작 시 자동 실행 설정
pm2 startup
pm2 save
```

#### 4. PM2 관리 명령어

```bash
# 상태 확인
pm2 status

# 로그 확인
pm2 logs rapportnote-landing

# 로그 실시간 모니터링
pm2 logs rapportnote-landing --lines 100

# 앱 재시작
pm2 restart rapportnote-landing

# 앱 중지
pm2 stop rapportnote-landing

# 앱 삭제
pm2 delete rapportnote-landing
```

#### 5. Nginx 설정 (포트 숨기기 + HTTPS)

**Nginx 설치:**
```bash
sudo apt update
sudo apt install nginx
```

**Nginx 설정 파일 생성:**
```bash
sudo nano /etc/nginx/sites-available/rapportnote-landing
```

**방법 1: 서브도메인 사용 (landing.도메인.com)**
```nginx
server {
    listen 80;
    server_name landing.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**방법 2: 경로 기반 (도메인.com/landing)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 기존 서비스 (루트)
    location / {
        proxy_pass http://localhost:기존포트;
    }

    # 랜딩 페이지
    location /landing {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Nginx 설정 활성화:**
```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/rapportnote-landing /etc/nginx/sites-enabled/

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

#### 6. HTTPS 설정 (Let's Encrypt)

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx

# SSL 인증서 발급 및 자동 설정
sudo certbot --nginx -d landing.your-domain.com

# 자동 갱신 확인
sudo certbot renew --dry-run
```

#### 7. 코드 업데이트 시 배포 방법

```bash
# 서버에 SSH 접속
ssh [사용자명]@[서버IP]

# 프로젝트 디렉토리로 이동
cd ~/rapportnote/rapportnote_landing

# 최신 코드 pull
git pull origin main

# 의존성 업데이트 (필요시)
npm install

# 빌드
npm run build

# PM2로 재시작
pm2 restart rapportnote-landing

# 로그 확인
pm2 logs rapportnote-landing --lines 50
```

#### 8. 방화벽 설정 (Google Cloud)

Google Cloud Console에서:
1. **VPC 네트워크** > **방화벽 규칙**
2. HTTP (포트 80) 허용
3. HTTPS (포트 443) 허용

또는 gcloud 명령어:
```bash
# HTTP 허용
gcloud compute firewall-rules create allow-http --allow tcp:80

# HTTPS 허용
gcloud compute firewall-rules create allow-https --allow tcp:443
```

#### 9. 문제 해결

**앱이 시작되지 않는 경우:**
```bash
# 로그 확인
pm2 logs rapportnote-landing

# Node.js 버전 확인
node --version  # v18 이상이어야 함

# 수동 실행 테스트
cd ~/rapportnote/rapportnote_landing
npm start
```

**포트가 이미 사용 중인 경우:**
```bash
# 포트 3000 사용 중인 프로세스 확인
lsof -i :3000

# 해당 프로세스 종료
kill -9 [PID]
```

**Nginx 설정 오류:**
```bash
# Nginx 설정 테스트
sudo nginx -t

# Nginx 로그 확인
sudo tail -f /var/log/nginx/error.log
```

#### 10. 배포 체크리스트

- [ ] Node.js v18+ 설치 확인
- [ ] PM2 설치 확인
- [ ] Git 저장소 클론
- [ ] .env 파일 설정
- [ ] npm install 및 npm run build 성공
- [ ] PM2로 앱 시작
- [ ] Nginx 설정 및 활성화
- [ ] 방화벽 포트 허용 (80, 443)
- [ ] HTTPS 인증서 발급
- [ ] 브라우저에서 접속 테스트

---

