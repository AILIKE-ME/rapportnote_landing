import { Footer } from '@/components/layout/Footer'

/**
 * 개인정보처리방침 페이지
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            주식회사 에이아이라이크미(이하 '회사')은(는) 개인정보 보호법에 따라 정보주체의 개인정보를 보호하고
            이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 개인정보의 수집 및 이용목적</h2>
            <p className="text-gray-700 mb-4">
              회사가 수집한 개인정보는 다음의 목적을 위하여 활용하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>회원관리:</strong> 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
                회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지
              </li>
              <li>
                <strong>진료기록 전사 서비스 제공:</strong> 정신건강의학과 진료 중 실시간 음성 인식을 통한
                진료 내용 전사, 의무기록 초안 자동 생성, EMR 시스템 자동 입력 지원
              </li>
              <li>
                <strong>음성 데이터 처리:</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>실시간 음성을 텍스트로 변환 (OpenAI Whisper API 이용)</li>
                  <li>전사된 텍스트를 의무기록 형식으로 변환 (Google Gemini API 이용)</li>
                  <li className="font-semibold text-primary-700">음성 데이터는 전사 완료 즉시 삭제되며, 별도로 저장되지 않습니다</li>
                  <li className="font-semibold text-primary-700">음성 데이터는 AI 학습에 활용되지 않습니다</li>
                </ul>
              </li>
              <li>
                <strong>서비스 성능 개선:</strong> 오류 발생 내역, 서비스 이용 기록 파악,
                이용자 대상 설문을 통한 이용환경 개선
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 개인정보 수집 항목 및 수집방법</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">수집하는 개인정보의 항목</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>회원정보:</strong> 이름, 이메일, 전화번호, 소속 기관명
              </li>
              <li>
                <strong>서비스 이용 과정에서 생성되는 정보:</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>진료 중 녹음된 음성 데이터 (실시간 전사 후 즉시 삭제)</li>
                  <li>전사된 텍스트 데이터</li>
                  <li>생성된 의무기록 초안</li>
                  <li>서비스 이용기록 (접속 시간, 이용 기록 등)</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">개인정보 수집방법</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>회원 가입 절차 중 이용자의 개인정보 입력을 통한 수집</li>
              <li>서비스 사용 중 이용자의 자발적 제공을 통한 수집</li>
              <li>서비스 이용 과정에서 자동으로 생성되어 수집</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 개인정보의 처리 및 보유 기간</h2>
            <p className="text-gray-700 mb-4">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은
              개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">회사 내부 방침에 의한 정보 보유</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>회원정보:</strong> 회원 탈퇴 시까지</li>
              <li><strong>음성 데이터:</strong> 전사 완료 즉시 삭제 (저장하지 않음)</li>
              <li><strong>전사된 텍스트 및 의무기록:</strong> 회원 탈퇴 시 또는 사용자가 삭제 요청 시까지</li>
              <li><strong>서비스 이용기록:</strong> 회원 탈퇴 후 3개월</li>
              <li><strong>부정이용기록:</strong> 부정 이용 방지를 위해 부정 이용 발생 후 3년</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">관련법령에 의한 정보보유</h3>
            <p className="text-gray-700 mb-3">
              상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우
              회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 개인정보의 제3자 제공에 관한 사항</h2>
            <p className="text-gray-700 mb-4">
              회사는 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며,
              정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만
              개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.
            </p>
            <p className="text-gray-700">
              회사는 이용자들의 개인정보를 "개인정보의 수집 및 이용목적"에서 고지한 범위 내에서 사용하며,
              이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 개인정보 처리업무의 위탁에 관한 사항</h2>
            <p className="text-gray-700 mb-4">
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">위탁 받는 자(수탁자)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">위탁업무</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Google Cloud Platform</td>
                    <td className="border border-gray-300 px-4 py-2">서비스 제공을 위한 인프라 관리</td>
                    <td className="border border-gray-300 px-4 py-2">위탁 계약 종료시까지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">OpenAI</td>
                    <td className="border border-gray-300 px-4 py-2">음성 데이터 실시간 전사 (Whisper API)</td>
                    <td className="border border-gray-300 px-4 py-2">전사 완료 즉시 삭제</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Google (Gemini API)</td>
                    <td className="border border-gray-300 px-4 py-2">전사된 텍스트를 의무기록 형식으로 변환</td>
                    <td className="border border-gray-300 px-4 py-2">처리 완료 즉시 삭제</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-sm text-blue-900">
                <strong>중요:</strong> OpenAI와 Google의 API를 통해 처리되는 음성 데이터 및 텍스트는
                이들 서비스의 AI 모델 학습에 사용되지 않습니다.
                회사는 API 사용 시 "학습 금지(zero data retention)" 옵션을 적용하고 있습니다.
              </p>
            </div>

            <p className="text-gray-700 mt-6">
              회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지,
              기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항이
              계약서 등 문서에 명시되어있는지 확인하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 개인정보의 파기절차 및 파기방법</h2>
            <p className="text-gray-700 mb-4">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">파기절차</h3>
            <p className="text-gray-700 mb-4">
              회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아
              개인정보를 파기합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">파기방법</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기</li>
              <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">음성 데이터 파기</h3>
            <p className="text-gray-700">
              <strong className="text-primary-700">녹음된 음성 데이터는 실시간 전사가 완료되는 즉시 자동으로 삭제되며,
              서버나 데이터베이스에 별도로 저장되지 않습니다.</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</li>
              <li>권리 행사는 회사에 대해 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</li>
              <li>권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.</li>
              <li>개인정보 열람 및 처리정지 요구는 「개인정보 보호법」에 의하여 정보주체의 권리가 제한될 수 있습니다.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 개인정보의 안전성 확보조치에 관한 사항</h2>
            <p className="text-gray-700 mb-4">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li><strong>기술적 조치:</strong> 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및 갱신</li>
              <li><strong>물리적 조치:</strong> 전산실, 자료보관실 등의 접근통제</li>
              <li><strong>음성 데이터 보호:</strong> 실시간 전사 후 즉시 삭제, HTTPS 암호화 통신, WebSocket 보안 연결</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 개인정보 보호책임자에 관한 사항</h2>
            <p className="text-gray-700 mb-4">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의
              불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">개인정보 보호 책임자</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>담당자:</strong> 박하림</li>
                <li><strong>직책:</strong> 대표이사</li>
                <li><strong>연락처:</strong> <a href="mailto:hrpark@ailike.me" className="text-primary-600 hover:text-primary-700">hrpark@ailike.me</a></li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 정보주체의 권익침해에 대한 구제방법</h2>
            <p className="text-gray-700 mb-4">
              정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회,
              한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
              <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
              <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
              <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
            <p className="text-gray-700">
              이 개인정보처리방침은 2025년 11월 1일부터 적용됩니다.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
