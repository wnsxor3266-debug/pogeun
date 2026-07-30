const AGE_GROUPS = [
  { label: '신생아 (0~3개월)', hours: '14~17시간' },
  { label: '영아 (4~11개월)', hours: '12~16시간' },
  { label: '유아 (1~2세)', hours: '11~14시간' },
  { label: '미취학아동 (3~5세)', hours: '10~13시간' },
  { label: '취학아동 (6~12세)', hours: '9~12시간' },
  { label: '청소년 (13~18세)', hours: '8~10시간' },
  { label: '성인 (18~64세)', hours: '7~9시간' },
  { label: '노인 (65세 이상)', hours: '7~8시간' },
]

const USAGE_STEPS = [
  {
    title: '지금 잘래요',
    desc: '지금 바로 잠자리에 들 계획이라면 이 버튼 하나면 충분해요. 현재 시각에 잠드는 데 걸리는 평균 시간을 더해서, 몇 시에 일어나면 좋을지 몇 가지로 보여드려요.',
  },
  {
    title: '기상시간 정하기',
    desc: '내일 몇 시까지는 일어나야 한다는 목표가 있다면 그 시각을 넣어보세요. 목표 기상 시간에서 거꾸로 계산해서, 잠자리에 들면 좋은 시간들을 안내해드려요.',
  },
  {
    title: '취침시간 정하기',
    desc: '잠자리에 드는 시간이 이미 정해져 있다면 그 시각을 입력해주세요. 몇 시에 알람을 맞추면 좋을지 몇 가지 선택지로 정리해드려요.',
  },
]

const SLEEP_STAGES = [
  {
    name: '얕은 수면',
    desc: '잠들기 시작하는 구간이에요. 외부 자극에 비교적 쉽게 깨어날 수 있고, 몸이 서서히 이완되며 다음 단계로 넘어갈 준비를 해요.',
  },
  {
    name: '깊은 수면',
    desc: '뇌와 몸이 가장 깊이 쉬는 구간으로 알려져 있어요. 이 시간에 깨어나면 유독 몽롱하고 무겁게 느껴질 수 있어요.',
  },
  {
    name: '렘수면',
    desc: '눈동자가 빠르게 움직이고 꿈을 많이 꾸는 구간이에요. 뇌는 깨어있을 때와 비슷하게 활발히 움직인다고 알려져 있어요.',
  },
]

function SleepScienceInfo() {
  return (
    <section className="info fade-in">
      <div className="info__block">
        <h2 className="info__heading">포근은 이런 서비스예요</h2>
        <p className="info__text">
          포근은 90분 단위로 반복되는 수면 주기를 바탕으로, 얕은 잠에서 억지로 깨는 대신 개운하게 눈뜰 수 있는
          시간을 찾아드리는 렘수면 계산기예요. 지금 잠들 때, 정해둔 기상 시간, 정해둔 취침 시간 중 편한 방식을
          하나 고르면 몇 번의 수면 주기 뒤에 일어나면 좋을지 바로 계산해드려요.
        </p>
      </div>

      <div className="info__block">
        <h2 className="info__heading">연령대별 권장 수면 시간</h2>
        <p className="info__lead">
          미국수면재단(NSF)과 미국 질병통제예방센터(CDC)는 나이에 따라 필요한 수면 시간이 다르다고 안내하고
          있어요. 아래에서 내 나이대에 맞는 적정 수면 시간을 확인해보세요.
        </p>
        <div className="sleep-table">
          {AGE_GROUPS.map((row) => (
            <div className="sleep-table__row" key={row.label}>
              <span className="sleep-table__label">{row.label}</span>
              <span className="sleep-table__value">{row.hours}</span>
            </div>
          ))}
        </div>
        <p className="info__source">출처: 미국수면재단(National Sleep Foundation), 미국 질병통제예방센터(CDC)</p>
      </div>

      <div className="info__block">
        <h2 className="info__heading">렘수면 계산기, 이렇게 써보세요</h2>
        <div className="usage-list">
          {USAGE_STEPS.map((step) => (
            <div className="usage-list__item" key={step.title}>
              <p className="usage-list__title">{step.title}</p>
              <p className="usage-list__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info__block">
        <h2 className="info__heading">수면 주기란 무엇일까요</h2>
        <p className="info__text">
          우리 몸은 잠든 순간부터 약 90분을 한 단위로 하는 수면 주기를 반복하는 것으로 알려져 있어요. 하룻밤
          동안 이 주기는 보통 5~6번 되풀이되는데, 한 주기 안에서 얕은 잠에서 깊은 잠으로, 다시 렘수면으로
          넘어가는 흐름이 이어져요. 그래서 수면은 '얼마나 오래 자는지'만큼이나 '어느 시점에 깨어나는지'도
          중요하다고 알려져 있어요. 수면 주기가 끝나가는 얕은 잠 구간에서 깨어나면 몸이 한결 가볍게 느껴질 수
          있어요.
        </p>
      </div>

      <div className="info__block">
        <h2 className="info__heading">수면의 단계</h2>
        <p className="info__lead">한 번의 수면 주기는 크게 세 단계로 나눠볼 수 있어요.</p>
        <div className="stage-list">
          {SLEEP_STAGES.map((stage) => (
            <div className="stage-list__item" key={stage.name}>
              <p className="stage-list__name">{stage.name}</p>
              <p className="stage-list__desc">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info__block">
        <h2 className="info__heading">양질의 수면이 주는 것들</h2>
        <p className="info__text">
          충분하고 규칙적인 수면은 낮 동안의 집중력과 기분을 안정적으로 유지하는 데 도움이 될 수 있다고 알려져
          있어요. 여러 연구에서는 꾸준한 수면 습관이 몸의 회복이나 컨디션 관리와도 관련이 있다고 보고하고
          있어요. 다만 수면의 효과는 사람마다 다르게 나타날 수 있고, 특정 질환을 예방하거나 치료하는 것은
          아니에요.
        </p>
      </div>

      <div className="info__block">
        <h2 className="info__heading">렘수면이란 무엇인가요</h2>
        <p className="info__text">
          렘(REM)은 '빠른 눈동자 움직임(Rapid Eye Movement)'의 줄임말이에요. 렘수면 동안에는 눈동자가 빠르게
          움직이고 꿈을 꾸는 경우가 많으며, 뇌파는 깨어있을 때와 비슷한 양상을 보인다고 알려져 있어요. 하룻밤
          동안 렘수면은 뒤로 갈수록 길어지는 경향이 있어서, 아침에 가까운 수면 주기일수록 렘수면 비중이
          커진다고 해요.
        </p>
      </div>

      <p className="info__disclaimer">
        본 정보는 일반적인 수면 지식 제공을 위한 것이며 의학적 조언이 아닙니다. 수면 문제가 지속되면 전문의와
        상담하세요.
      </p>
      <p className="info__references">참고: 미국수면재단(National Sleep Foundation), 미국 질병통제예방센터(CDC)</p>
    </section>
  )
}

export default SleepScienceInfo
