/**
 * Gmail OAuth 2.0 이메일 전송 서비스
 *
 * Google의 최신 보안 표준인 OAuth 2.0을 사용하여 안전하게 이메일을 전송합니다.
 * 앱 비밀번호보다 보안 수준이 높고 권한 관리가 용이합니다.
 */

import { google } from 'googleapis'
import type { OAuth2Client } from 'google-auth-library'

/**
 * Gmail OAuth 서비스 클래스
 *
 * Google Cloud Console에서 생성한 OAuth 2.0 클라이언트 ID를 사용하여
 * 안전하게 Gmail을 통해 이메일을 전송합니다.
 */
export class GmailOAuthService {
  private oauth2Client: OAuth2Client

  /**
   * GmailOAuthService 초기화
   *
   * @param clientId - Google Cloud Console OAuth 2.0 클라이언트 ID
   * @param clientSecret - OAuth 2.0 클라이언트 시크릿
   * @param refreshToken - OAuth 2.0 리프레시 토큰
   */
  constructor(clientId: string, clientSecret: string, refreshToken: string) {
    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret)
    this.oauth2Client.setCredentials({ refresh_token: refreshToken })
  }

  /**
   * 이메일 메시지 생성 (RFC 2822 형식)
   *
   * @param to - 수신자 이메일 주소
   * @param subject - 이메일 제목
   * @param html - 이메일 본문 (HTML)
   * @returns Base64로 인코딩된 이메일 메시지
   */
  private createMessage(to: string, subject: string, html: string): string {
    const messageParts = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      html,
    ]

    const message = messageParts.join('\n')
    return Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  /**
   * 이메일 전송
   *
   * @param to - 수신자 이메일 주소
   * @param subject - 이메일 제목
   * @param html - 이메일 본문 (HTML)
   * @returns 전송 결과
   * @throws {Error} 이메일 전송 실패 시
   */
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client })
      const raw = this.createMessage(to, subject, html)

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw,
        },
      })
    } catch (error) {
      console.error('Gmail API 오류:', error)
      throw new Error(`이메일 전송 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
    }
  }

  /**
   * 랜딩 페이지 문의 폼 이메일 전송
   *
   * @param recipient - 수신자 이메일 주소 (관리자)
   * @param name - 문의자 이름
   * @param email - 문의자 이메일
   * @param subject - 문의 제목
   * @param message - 문의 내용
   */
  async sendContactFormEmail(
    recipient: string,
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f97316;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: bold;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .value {
            color: #111827;
            font-size: 16px;
          }
          .message-box {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin-top: 10px;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">📬 새로운 문의가 도착했습니다</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">이름</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">이메일</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">제목</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">메시지</div>
              <div class="message-box">${message}</div>
            </div>
            <div class="footer">
              <p>이 메일은 RapportNote 랜딩 페이지 문의 폼을 통해 자동으로 전송되었습니다.</p>
              <p>회신이 필요한 경우 위 이메일 주소로 답장해주세요.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    const emailSubject = `[RapportNote 문의] ${subject}`
    await this.sendEmail(recipient, emailSubject, html)
  }

  /**
   * 문의자에게 자동 응답 이메일 전송
   *
   * @param to - 문의자 이메일 주소
   * @param name - 문의자 이름
   * @param subject - 문의 제목
   * @param message - 문의 내용
   * @param adminEmail - 관리자 이메일
   */
  async sendAutoReplyEmail(
    to: string,
    name: string,
    subject: string,
    message: string,
    adminEmail: string
  ): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f97316;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
          }
          .message-box {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">문의 접수 확인</h2>
          </div>
          <div class="content">
            <p>안녕하세요, <strong>${name}</strong>님!</p>
            <p>RapportNote에 문의해 주셔서 감사합니다.</p>
            <p>귀하의 문의가 정상적으로 접수되었으며, 평균 24시간 이내에 답변드리겠습니다.</p>

            <div class="message-box">
              <h3 style="margin-top: 0; color: #374151;">접수된 문의 내용</h3>
              <p style="margin: 5px 0;"><strong>제목:</strong> ${subject}</p>
              <div style="margin-top: 10px;">
                <strong>메시지:</strong>
                <div style="margin-top: 5px; white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <p>추가 문의사항이 있으시면 언제든지 연락주세요.</p>
            <p>감사합니다.</p>

            <div class="footer">
              <p><strong>RapportNote 팀</strong></p>
              <p>이메일: ${adminEmail}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await this.sendEmail(to, '[RapportNote] 문의가 접수되었습니다', html)
  }
}
