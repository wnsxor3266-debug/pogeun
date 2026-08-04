function PrivacyScreen() {
  return (
    <div className="privacy-screen fade-in">
      <p className="privacy-screen__updated">최종 수정일 2026. 8. 4.</p>

      <section className="privacy-section">
        <h2 className="privacy-section__title">수집하는 정보</h2>
        <p className="privacy-section__text">
          '포근'은 별도의 회원가입 없이 이용할 수 있어요. 앱 출시 알림을 신청하실 때 입력하신{' '}
          <strong>이메일 주소</strong>만 수집하며, 출시 소식을 안내하는 용도로만 사용해요.
        </p>
        <p className="privacy-section__text">
          수면 나이 테스트 답변이나 수면 기록은 서버로 전송되지 않고, 이용자의 기기(브라우저)에만 저장돼요.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section__title">광고·분석 쿠키 (Meta 픽셀)</h2>
        <p className="privacy-section__text">
          서비스 개선과 광고 효과 측정을 위해 Meta 픽셀을 사용하고 있어요. 페이지 방문, 테스트 완료 등
          서비스 이용 패턴을 비식별 정보로 수집하며, 브라우저 설정에서 쿠키를 차단하면 수집을 막을 수
          있어요.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section__title">제휴 마케팅 (쿠팡 파트너스)</h2>
        <p className="privacy-section__text">
          '포근'은 쿠팡 파트너스 활동의 일환으로, 제휴 링크를 통한 구매 발생 시 일정액의 수수료를 제공받을
          수 있어요.
        </p>
      </section>

      <section className="privacy-section">
        <h2 className="privacy-section__title">정보 보관 및 삭제</h2>
        <p className="privacy-section__text">
          수집한 이메일 주소는 앱 출시 안내 목적을 다하면 삭제해요. 브라우저에 저장된 수면 기록은
          이용자가 직접 삭제하거나 브라우저 데이터를 지우면 함께 사라져요.
        </p>
      </section>
    </div>
  )
}

export default PrivacyScreen
