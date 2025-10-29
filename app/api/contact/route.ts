import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { GmailOAuthService } from '@/lib/services/gmail-oauth'

/**
 * 문의 폼 스키마
 * 클라이언트에서 전송된 데이터 검증
 */
const contactSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('유효한 이메일을 입력해주세요'),
  subject: z.string().min(5, '제목은 최소 5자 이상이어야 합니다'),
  message: z.string().min(10, '메시지는 최소 10자 이상이어야 합니다'),
})

type ContactFormData = z.infer<typeof contactSchema>

/**
 * Gmail OAuth 서비스 초기화
 *
 * @returns {GmailOAuthService} Gmail OAuth 서비스 인스턴스
 * @throws {Error} 환경 변수가 설정되지 않은 경우
 */
function createGmailService(): GmailOAuthService {
  const clientId = process.env.GMAIL_CLIENT_ID
  const clientSecret = process.env.GMAIL_CLIENT_SECRET
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Gmail OAuth 환경 변수가 설정되지 않았습니다.')
  }

  return new GmailOAuthService(clientId, clientSecret, refreshToken)
}

/**
 * POST /api/contact
 * 문의 폼 제출 처리 및 이메일 전송
 *
 * @param {NextRequest} request - Next.js 요청 객체
 * @returns {NextResponse} JSON 응답 (성공/실패)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 body 파싱
    const body = await request.json()

    // 2. 데이터 검증
    const validatedData: ContactFormData = contactSchema.parse(body)

    // 3. 환경 변수 검증
    const adminEmail = process.env.NEXT_PUBLIC_EMAIL_USER
    if (!adminEmail) {
      console.error('관리자 이메일이 설정되지 않았습니다.')
      return NextResponse.json(
        { error: '이메일 설정이 올바르지 않습니다. 관리자에게 문의해주세요.' },
        { status: 500 }
      )
    }

    // 4. Gmail OAuth 서비스 초기화
    const gmailService = createGmailService()

    // 5. 관리자에게 문의 내용 전송
    await gmailService.sendContactFormEmail(
      adminEmail,
      validatedData.name,
      validatedData.email,
      validatedData.subject,
      validatedData.message
    )

    // 6. 문의자에게 자동 응답 이메일 전송
    await gmailService.sendAutoReplyEmail(
      validatedData.email,
      validatedData.name,
      validatedData.subject,
      validatedData.message,
      adminEmail
    )

    // 7. 성공 응답
    return NextResponse.json(
      { message: '문의가 성공적으로 전송되었습니다.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('문의 처리 중 오류:', error)

    // Zod 검증 오류
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다.', details: error.issues },
        { status: 400 }
      )
    }

    // Gmail OAuth 오류
    if (error instanceof Error && error.message.includes('OAuth')) {
      return NextResponse.json(
        { error: 'Gmail 인증 실패. 관리자에게 문의해주세요.' },
        { status: 500 }
      )
    }

    // 기타 오류
    return NextResponse.json(
      { error: '문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}
