import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { WriteRepairRequestView } from 'src/sections/view/repair-request/write-repair-request-view';



// 수리 요청 작성 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const questions = [
  {
    id: 0,
    title: '엔진룸에서 소음이 나요',
    tags: [
      { id: 0, name: '엔진룸' },
      { id: 1, name: '소음' },
    ],
    content: `
      안녕하세요! Hofix입니다. <br /><br />
      차량 주행 중 엔진룸에서 소리가 들리나요? <br />
      다음과 같은 경우를 의심해볼 수 있습니다: <br /><br />
      1. 엔진 내부 부품 마모 또는 고장<br />
      2. 배기 시스템 문제<br />
      3. 벨트 및 풀리 마모<br /><br />
      빠르게 정비소 점검을 받아보시길 권장드립니다. <br />
      Hofix는 안전 운전을 응원합니다!
    `,
  },
  {
    id: 1,
    title: '브레이크 밟을 때 끼익 소리가 나요',
    tags: [
      { id: 2, name: '브레이크' },
      { id: 3, name: '소음' },
    ],
    content: `
      안녕하세요! Hofix입니다. <br /><br />
      제동 시 끼익 하는 소리가 들리시나요?<br />
      다음 원인을 점검해보세요: <br /><br />
      1. 브레이크 패드 마모<br />
      2. 디스크/드럼 변형 또는 이물질<br />
      3. 습기 또는 오일 오염<br /><br />
      장시간 방치 시 제동 성능 저하로 이어질 수 있습니다.<br />
      가까운 정비소 점검을 추천드립니다.
    `,
  },
  {
    id: 2,
    title: '에어컨에서 냄새가 나요',
    tags: [
      { id: 4, name: '에어컨' },
      { id: 5, name: '악취' },
    ],
    content: `
      안녕하세요! Hofix입니다. <br /><br />
      차량 에어컨 작동 시 불쾌한 냄새가 나시나요? <br />
      아래 원인을 점검해보세요: <br /><br />
      1. 에어컨 필터 오염<br />
      2. 에바포레이터 내부 곰팡이<br />
      3. 배수 라인 막힘<br /><br />
      쾌적한 차량 환경을 위해 주기적인 청소와 필터 교체를 권장드립니다.
    `,
  },
];

const cars = [
  {
    id: 0,
    image: `${CONFIG.assetsDir}/assets/images/car/car1.png`,
    number: '12가 1234',
    name: '쏘렌토 MQ4',
    manufacturer: '기아',
  },
  {
    id: 1,
    image: `${CONFIG.assetsDir}/assets/images/car/car2.png`,
    number: '34나 5678',
    name: '그랜저 IG',
    manufacturer: '현대',
  },
];

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <WriteRepairRequestView questions={questions} cars={cars} />
    </>
  );
}
