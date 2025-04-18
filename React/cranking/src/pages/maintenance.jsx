import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MaintenanceView } from 'src/sections/view/maintenance-view';



// 게시물 검색 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const noticePosts = [
  {
    id: 0,
    title: '[공지사항] Hofix 서버 점검 안내 (2025-10-01 ~ 2025-10-02)',
    author: {
      id: 0,
      nickname: 'Hofix 운영팀',
      accountType: '관리자',
    },
    createdAt: '2025-10-01 10:00',
    viewCount: 10,
  },
  {
    id: 1,
    title: '[공지사항] Hofix 개인정보 처리방침 변경 안내',
    author: {
      id: 1,
      nickname: 'Hofix 운영팀',
      accountType: '관리자',
    },
    createdAt: '2025-10-01 10:00',
    viewCount: 5,
  },
  {
    id: 2,
    title: '[공지사항] Hofix 서비스 이용약관 변경 안내',
    author: {
      id: 2,
      nickname: 'Hofix 운영팀',
      accountType: '관리자',
    },
    createdAt: '2025-10-01 10:00',
    viewCount: 3,
  }
];

const eventPosts = [
  {
    id: 0,
    image: `${CONFIG.assetsDir}/assets/images/1.webp`,
    title: '[이벤트] Hofix 신규 회원 가입 이벤트 안내',
    createdAt: '2025-10-01 10:00',
    viewCount: 10,
  },
  {
    id: 1,
    image: `${CONFIG.assetsDir}/assets/images/2.webp`,
    title: '[이벤트] Hofix 10월 이벤트! 미션을 완료하고 보상을 받자!',
    createdAt: '2025-10-01 10:00',
    viewCount: 5,
  },
  {
    id: 2,
    image: `${CONFIG.assetsDir}/assets/images/3.webp`,
    title: '[이벤트] 정비소 이용 후기 작성 이벤트 안내',
    createdAt: '2025-10-01 10:00',
    viewCount: 3,
  }
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MaintenanceView noticePosts={noticePosts} eventPosts={eventPosts} />
    </>
  );
}
