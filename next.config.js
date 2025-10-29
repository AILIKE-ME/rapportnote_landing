/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // /landing 경로로 배포할 때 필요한 설정
  basePath: '/landing',
  images: {
    domains: [
      // API 서버 도메인이나 외부 이미지 도메인을 여기에 추가
      'api.rapportnote.com',
    ],
  },
}

module.exports = nextConfig
