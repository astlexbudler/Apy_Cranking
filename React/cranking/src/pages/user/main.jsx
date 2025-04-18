import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { UserMainView } from 'src/sections/view/main/user-main-view';



// 사용자 메인 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const noticePosts = [
  {
    id: 0,
    title: '[공지사항] Hofix 서버 점검 안내 (2025-10-01 ~ 2025-10-02)',
    createdAt: '2025-10-01 10:00',
  },
  {
    id: 1,
    title: '[공지사항] Hofix 개인정보 처리방침 변경 안내',
    createdAt: '2025-10-01 10:00',
  },
  {
    id: 2,
    title: '[공지사항] Hofix 서비스 이용약관 변경 안내',
    createdAt: '2025-10-01 10:00',
  },
];

const eventPosts = [
  {
    id: 0,
    image: `${CONFIG.assetsDir}/assets/images/1.webp`,
    title: '[이벤트] Hofix 신규 회원 가입 이벤트 안내',
    createdAt: '2025-10-01 10:00',
  },
  {
    id: 1,
    image: `${CONFIG.assetsDir}/assets/images/2.webp`,
    title: '[이벤트] Hofix 10월 이벤트! 미션을 완료하고 보상을 받자!',
    createdAt: '2025-10-01 10:00',
  },
  {
    id: 2,
    image: `${CONFIG.assetsDir}/assets/images/3.webp`,
    title: '[이벤트] 정비소 이용 후기 작성 이벤트 안내',
    createdAt: '2025-10-01 10:00',
  }
];

const orders = [
  {
    id: 0,
    selectedQuestionTags: ['엔진룸', '소음', '차량 흔들림'],
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
    createdAt: '2025-01-01 10:00',
    status: '수리', // 요청, 진행, 수리, 완료, 리뷰, 취소
    avaiableDates: [
      '2025-01-02',
      '2025-01-03',
      '2025-01-04',
      '2025-01-05',
      '2025-01-06',
    ],
  },
  {
    id: 1,
    selectedQuestionTags: ['브레이크', '삐걱거림'],
    mechanic: null,
    car: {
      id: 2,
      image: `${CONFIG.assetsDir}/assets/images/car/car2.png`,
      number: '45너 6789',
      name: '그랜저 IG',
      manufacturer: '현대',
    },
    createdAt: '2025-01-01 10:00',
    status: '요청', // 요청, 진행, 수리, 완료, 리뷰, 취소
    estimateCount: 3,
  }
]

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserMainView noticePosts={noticePosts} eventPosts={eventPosts} orders={orders} />
    </>
  );
}
