import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { WriteEstimateView } from 'src/sections/view/estimate/write-estimate-view';




// 견적 발송 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const order = {
  id: 0,
  selectedQuestionTags: ['엔진룸', '소음', '차량 흔들림'],
  selectedQuestions: [
    {
      id: 0,
      title: '엔진룸에서 소음이 나요',
      tags: ['엔진룸', '소음'],
    },
    {
      id: 1,
      title: '운행중 차량이 흔들려요',
      tags: ['차량 흔들림']
    }
  ],
  user: {
    id: 101,
    email: 'jiyoon.lee@email.com',
    nickname: '이지윤',
    tel: '01012345678',
  },
  car: {
    id: 1,
    image: `${CONFIG.assetsDir}/assets/images/car/car1.png`,
    number: '12가 1234',
    name: '쏘렌토 MQ4',
    manufacturer: '기아',
  },
  images: [`${CONFIG.assetsDir}/assets/images/order/1.png`, `${CONFIG.assetsDir}/assets/images/order/2.png`, `${CONFIG.assetsDir}/assets/images/order/3.png`],
  message: '안녕하세요, 정비사님! 엔진룸에서 소음이 나고 운행중에 차량이 흔들립니다. 뭐가 문제일까요? 확인 부탁드립니다.',
  createdAt: '2025-01-01 10:00',
  status: '요청', // 요청, 진행, 수리, 완료, 리뷰, 취소
  avaiableDates: [
    '2025-01-02',
    '2025-01-03',
    '2025-01-04',
    '2025-01-05',
    '2025-01-06',
  ],
  address: '서울특별시 강남구 테헤란로 123',
  lat: 37.123456,
  lon: 127.123456,
};

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <WriteEstimateView order={order} />
    </>
  );
}
