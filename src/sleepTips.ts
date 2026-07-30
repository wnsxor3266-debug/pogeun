export const SLEEP_TIPS: string[] = [
  '커피는 오후 2시 이후엔 참아보세요',
  '자기 전 스마트폰은 침대 밖에 두세요',
  '침실은 최대한 어둡게 만들어보세요',
  '매일 같은 시각에 일어나 보세요',
  '낮잠은 20분을 넘기지 마세요',
  '잠들기 전 격한 운동은 피해보세요',
  '침실 온도는 18~20도로 맞춰보세요',
  '주말에도 기상 시간을 크게 바꾸지 마세요',
  '자기 전 과식은 피해보세요',
  '늦은 밤 알코올은 숙면을 방해할 수 있어요',
  '아침에 햇빛을 5분만 쬐어보세요',
  '침대는 잠잘 때만 사용해보세요',
  '자기 전 격한 논쟁은 잠시 미뤄보세요',
  '미지근한 물로 샤워하고 잠자리에 들어보세요',
  '자기 1시간 전엔 조명을 낮춰보세요',
  '카페인 대신 따뜻한 물 한 잔 어때요',
  '오늘의 걱정은 내일로 미뤄두고 잠들어보세요',
  '침구는 계절에 맞게 바꿔주세요',
  '낮 동안 몸을 움직이면 밤에 더 잘 잘 수 있어요',
  '자기 전 격한 게임은 잠시 쉬어가요',
  '늦은 밤 흡연은 수면의 질을 떨어뜨릴 수 있어요',
  '저녁엔 카페인 없는 차를 마셔보세요',
  '잠들기 전 10분, 오늘 하루를 정리해보세요',
  '침실에서 시계는 안 보이게 치워보세요',
  '자기 전 물은 너무 많이 마시지 마세요',
  '낮에 커튼을 열어 햇빛을 들여보세요',
  '자기 전 알림은 무음으로 바꿔보세요',
  '베개 높이를 내 목에 맞게 조절해보세요',
  '주중 부족한 잠을 하루 이틀에 몰아 갚지 마세요',
  '오늘 밤은 평소보다 15분 일찍 잠자리에 들어보세요',
]

function daysSinceEpoch(): number {
  const now = new Date()
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.floor(localMidnight.getTime() / 86400000)
}

export function getTodayTip(): string {
  const index = ((daysSinceEpoch() % SLEEP_TIPS.length) + SLEEP_TIPS.length) % SLEEP_TIPS.length
  return SLEEP_TIPS[index]
}
