import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SearchRepairRequestView } from 'src/sections/view/repair-request/search-repair-request-view';



// 수리 요청 검색 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const orders = [{
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
  mechanic: {
    id: 2,
    nickname: '우리 정비소',
    title: '내차처럼 소중히 다루겠습니다.',
    image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
  },
  car: {
    id: 1,
    image: `${CONFIG.assetsDir}/assets/images/car/car1.png`,
    number: '12가 1234',
    name: '쏘렌토 MQ4',
    manufacturer: '기아',
  },
  images: [`${CONFIG.assetsDir}/assets/images/order/product_1.png`, `${CONFIG.assetsDir}/assets/images/order/product_2.png`, `${CONFIG.assetsDir}/assets/images/order/product_3.png`],
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
  myEstimate: {
    id: 0,
    mechanic: {
      id: 2,
      nickname: '우리 정비소',
      title: '내차처럼 소중히 다루겠습니다.',
      image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
    },
    daysEstimated: 3,
    priceEstimated: '150,000원 ~ 200,000원',
    message: '안녕하세요. 엔진룸 소음과 흔들림의 경우 엔진 마운트나 서스펜션 문제일 수 있습니다. 점검 후 정확한 견적을 드리겠습니다. 메세지 주시면 상담 가능합니다. 감사합니다.',
    createdAt: '2025-01-01 10:00',
  }
}];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SearchRepairRequestView orders={orders} />
    </>
  );
}
