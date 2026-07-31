type CoupangDisclosureProps = {
  className?: string
}

function CoupangDisclosure({ className }: CoupangDisclosureProps) {
  return (
    <p className={`disclosure ${className ?? ''}`}>
      이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따라 일정액의 수수료를 제공받을 수 있습니다.
    </p>
  )
}

export default CoupangDisclosure
