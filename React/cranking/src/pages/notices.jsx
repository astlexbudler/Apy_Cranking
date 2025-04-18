import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SearchNoticeView } from 'src/sections/view/post/search-notice-view';



// 게시물 검색 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const posts = [
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
    commentCount: 0,
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
    commentCount: 3,
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
    commentCount: 1,
  }
];
export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SearchNoticeView posts={posts} />
    </>
  );
}
