import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SearchEstimateView } from 'src/sections/view/estimate/search-estimate-view';



// 발송한 견적들 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const orders = [
  {
    id: 0,
    selectedQuestionTags: ['엔진룸', '소음', '차량 흔들림'],
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
    message: '안녕하세요, 정비사님! 엔진룸에서 소음이 나고 운행중에 차량이 흔들립니다. 뭐가 문제일까요? 확인 부탁드립니다.',
    createdAt: '2025-01-01 10:00',
    status: '요청',
    address: '서울특별시 강남구 테헤란로 123',
    estimate: {
      id: 0,
      mechanic: {
        id: 2,
        nickname: '우리 정비소',
        title: '내차처럼 소중히 다루겠습니다.',
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
      },
      daysEstimated: 3,
      priceEstimated: '150,000원 ~ 200,000원',
      message:
        '안녕하세요. 엔진룸 소음과 흔들림의 경우 엔진 마운트나 서스펜션 문제일 수 있습니다. 점검 후 정확한 견적을 드리겠습니다. 메세지 주시면 상담 가능합니다. 감사합니다.',
    },
  },
  {
    id: 1,
    selectedQuestionTags: ['브레이크', '삐걱거림'],
    user: {
      id: 102,
      email: 'minsoo.kim@email.com',
      nickname: '김민수',
      tel: '01098765432',
    },
    car: {
      id: 2,
      image: `${CONFIG.assetsDir}/assets/images/car/car2.png`,
      number: '45너 6789',
      name: '그랜저 IG',
      manufacturer: '현대',
    },
    message: '안녕하세요, 정비사님! 브레이크에서 삐걱거림이 나요. 점검 부탁드립니다.',
    createdAt: '2025-01-03 14:20',
    status: '진행',
    address: '경기도 성남시 분당구 정자일로 55',
    estimate: {
      id: 1,
      mechanic: {
        id: 2,
        nickname: '우리 정비소',
        title: '내차처럼 소중히 다루겠습니다.',
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
      },
      daysEstimated: 1,
      priceEstimated: '80,000원 ~ 120,000원',
      message:
        '브레이크 패드 마모가 원인일 가능성이 높습니다. 간단한 교체 작업으로 해결 가능하며, 당일 수리도 가능합니다.',
    },
  },
  {
    id: 2,
    selectedQuestionTags: ['에어컨', '냉방 안됨', '악취'],
    user: {
      id: 103,
      email: 'sohee.park@email.com',
      nickname: '박소희',
      tel: '01011112222',
    },
    car: {
      id: 3,
      image: `${CONFIG.assetsDir}/assets/images/car/car3.png`,
      number: '89도 4321',
      name: '투싼 NX4',
      manufacturer: '현대',
    },
    message: '에어컨에서 냉방이 안되고 악취가 나요. 점검 부탁드립니다.',
    createdAt: '2025-01-05 09:30',
    status: '완료',
    address: '부산광역시 해운대구 센텀동로 99',
    estimate: {
      id: 2,
      mechanic: {
        id: 2,
        nickname: '우리 정비소',
        title: '내차처럼 소중히 다루겠습니다.',
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
      },
      daysEstimated: 2,
      priceEstimated: '130,000원 ~ 170,000원',
      message:
        '에어컨 냄새는 내부 필터 오염 또는 에바크리닝이 필요할 수 있습니다. 냉매 점검도 함께 진행해드리겠습니다.',
    },
  },
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SearchEstimateView orders={orders} />
    </>
  );
}
