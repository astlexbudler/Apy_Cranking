import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { DetailPostView } from 'src/sections/view/post/detail-post-view';



// 게시물 상세 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const post = {
  id: 0,
  image: `${CONFIG.assetsDir}/assets/images/post/post1.png`,
  title: '[공지사항] Hofix 서버 점검 안내 (2025-10-01 ~ 2025-10-02)',
  author: {
    id: 0,
    nickname: 'Hofix 운영팀',
    accountType: '관리자',
  },
  board: '공지',
  createdAt: '2025-10-01 10:00',
  viewCount: 10,
  content: `
    <p>안녕하세요, 차량 정비 예약 서비스 <b>Hofix</b>입니다.</p>
    <p>
    보다 편리하고 정확한 정비소 검색을 위해 <b>2025년 10월 1일(수) 00:00부터 10월 2일(목) 23:59까지</b>
    Hofix 서버 점검 및 서비스 업데이트가 진행될 예정입니다.
    이번 업데이트는 특히 <b>지도 기능 개선</b>에 중점을 두었으며, 사용자의 위치 기반으로
    <i>주변 정비소를 더 빠르고 정확하게 탐색</i>할 수 있도록 최적화하였습니다.
    </p>
    <p>또한, 다음과 같은 새로운 기능이 추가됩니다:</p>
    <ul>
      <li>정비소 <b>혼잡도 실시간 표시</b> 기능</li>
      <li>정비소의 <b>영업시간, 사용자 후기, 평점</b> 확인 기능 강화</li>
      <li>예약 시 <b>알림 기능</b> 개선으로 알림 예약 및 일정 관리 기능 추가</li>
      <li><i>사용자 UI/UX 개선</i>을 통해 더 직관적인 화면 구성</li>
    </ul>
    <p>
    업데이트 이후에는 기존 앱으로는 일부 기능이 정상적으로 작동하지 않을 수 있으므로,
    <b>반드시 앱을 최신 버전으로 업데이트</b>해 주시기 바랍니다.<br />
    최신 버전은 <b>플레이스토어(Android)</b> 또는 <b>앱스토어(iOS)</b>에서 'Hofix'를 검색 후,
    업데이트 버튼을 눌러 설치하실 수 있습니다.
    </p>
    <p>
    점검 기간 동안에는 서비스 접속이 <i>일시적으로 제한</i>될 수 있으며, 이로 인해 불편을 끼쳐드리는 점 양해 부탁드립니다.
    보다 안정적이고 향상된 서비스를 제공하기 위한 조치이오니 너그러운 이해와 협조를 부탁드립니다.
    </p>
    <p>
    앞으로도 Hofix는 사용자 여러분의 편의를 최우선으로 생각하며 <b>지속적인 서비스 개선</b>을 이어가겠습니다.
    <br />감사합니다.
    </p>
    <hr />
    <table border="1">
      <thead>
        <tr><th>항목</th><th>내용</th></tr>
      </thead>
      <tbody>
        <tr><td>점검 기간</td><td>2025년 10월 1일 00:00 ~ 10월 2일 23:59</td></tr>
        <tr><td>주요 업데이트</td><td>지도 기능 개선, 혼잡도 표시, 알림 기능 강화</td></tr>
        <tr><td>업데이트 필수 여부</td><td><b>필수</b></td></tr>
        <tr><td>업데이트 방법</td><td>플레이스토어 또는 앱스토어에서 최신 버전 설치</td></tr>
      </tbody>
    </table>`
};

const comments = [
  {
    id: 1,
    author: {
      nickname: '우리 정비소',
      title: '내차처럼 챙겨드립니다.',
      accountType: '정비소',
    },
    content: '안녕하세요. 댓글 내용입니다. 정비소입니다.',
    createdAt: '2025-10-01 12:00',
  },
  {
    id: 2,
    author: {
      nickname: '김정비',
      accountType: '사용자',
    },
    content: '안녕하세요. 댓글 내용입니다. 사용자입니다.',
    createdAt: '2025-10-01 12:00',
  }
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DetailPostView post={post} comments={comments} />
    </>
  );
}
