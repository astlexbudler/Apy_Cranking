import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { WritePostView } from 'src/sections/view/post/write-post-view';



// 수리 요청 상세 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const order = {
  id: 0,
  selectedQuestions: [
    {
      id: 0,
      title: '엔진룸에서 소음이 나요',
      tags: [
        {
          id: 0,
          name: '엔진룸',
        },
        {
          id: 1,
          name: '소음',
        },
      ]
    },
    {
      id: 1,
      title: '운행중 차량이 흔들려요',
      tags: [
        {
          id: 0,
          name: '차량 흔들림',
        },
      ]
    }
  ],
  mechanic: {
    id: 2,
    name: '우리 정비소',
    title: '내차처럼 소중히 다루겠습니다.',
    accountType: '정비사',
    images: [
      {
        id: 0,
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
      },
      {
        id: 1,
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png`,
      },
      {
        id: 2,
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png`,
      }
    ],
  },
  car: {
    id: 1,
    images: [
      { id: 0, image: `${CONFIG.assetsDir}/assets/images/car/car1.png` },
      { id: 1, image: `${CONFIG.assetsDir}/assets/images/car/car2.png` },
      { id: 2, image: `${CONFIG.assetsDir}/assets/images/car/car3.png` },
    ],
    number: '12가 1234',
    identificationNumber: 'KMHE341ABCD567890',
    name: '쏘렌토 MQ4',
    manufacturer: '기아',
    carType: 'SUV',
    carSize: '대형',
    year: '2023',
    cc: '2200',
    fuel: '디젤',
    transmission: '자동',
    color: '진회색',
  },
  images: [
    {
      id: 0,
      image: `${CONFIG.assetsDir}/assets/images/order/product_1.png`,
    },
    {
      id: 1,
      image: `${CONFIG.assetsDir}/assets/images/order/product_2.png`,
    },
    {
      id: 2,
      image: `${CONFIG.assetsDir}/assets/images/order/product_3.png`,
    }
  ],
  message: '안녕하세요, 정비사님! 엔진룸에서 소음이 나고 운행중에 차량이 흔들립니다. 뭐가 문제일까요? 확인 부탁드립니다.',
  createdAt: '2025-01-01 10:00',
  status: '수리중',
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

const estimates = [{
  id: 0,
  mechanic: {
    id: 2,
    nickname: '우리 정비소',
    title: '내차처럼 소중히 다루겠습니다.',
    accountType: '정비사',
    images: [
      {
        id: 0,
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`,
      },
      {
        id: 1,
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png`,
      },
      {
        id: 2,
        image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png`,
      }
    ],
  },
  daysEstimated: 3,
  priceEstimated: '150,000원 ~ 200,000원',
  message: '안녕하세요. 엔진룸 소음과 흔들림의 경우 엔진 마운트나 서스펜션 문제일 수 있습니다. 점검 후 정확한 견적을 드리겠습니다. 메세지 주시면 상담 가능합니다. 감사합니다.',
  createdAt: '2025-01-01 10:00',
}]

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <WritePostView order={order} estimates={estimates} />
    </>
  );
}
