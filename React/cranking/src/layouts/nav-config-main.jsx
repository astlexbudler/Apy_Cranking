import { paths } from 'src/routes/paths';

export const pageLinks = [
  {
    subheader: '사용자 서비스',
    items: [
      { title: '메인', path: paths.user.main },
      { title: '프로필', path: paths.user.profile },
      { title: '차량 목록', path: paths.user.cars },
      { title: '차량 등록', path: paths.user.carRegister },
      { title: '차량 수정', path: paths.user.carModify },
      { title: '정비 요청 목록', path: paths.user.repairRequests },
      { title: '정비 요청 보기', path: paths.user.repairRequest },
      { title: '정비 요청 작성', path: paths.user.repairRequestWrite },
      { title: '채팅', path: paths.chat },
      { title: '고객센터', path: paths.contact },
      { title: '이용약관', path: paths.terms },
    ],
  },
  {
    subheader: '정비소 서비스',
    items: [
      { title: '메인', path: paths.partner.main },
      { title: '프로필', path: paths.partner.profile },
      { title: '정비 요청 목록', path: paths.partner.repairRequests },
      { title: '정비 요청 보기', path: paths.partner.repairRequest },
      { title: '채팅', path: paths.chat },
      { title: '고객센터', path: paths.contact },
      { title: '이용약관', path: paths.terms },
    ],
  },
  {
    subheader: '관리자 서비스',
    items: [
      { title: '메인', path: paths.superuser.main },
      { title: '프로필', path: paths.superuser.profile },
      { title: '게시글 작성', path: paths.superuser.postWrite },
      { title: '게시글 수정', path: paths.superuser.postEdit },
      { title: '계정 목록', path: paths.superuser.accounts },
      { title: '계정 보기', path: paths.superuser.account },
      { title: '정비 요청 목록', path: paths.superuser.repairRequests },
      { title: '정비 요청 보기', path: paths.superuser.repairRequest },
      { title: '차량 목록', path: paths.superuser.cars },
      { title: '서버 로그', path: paths.superuser.logs },
      { title: '설정', path: paths.superuser.settings },
    ],
  },
  {
    subheader: '',
    items: [],
  },
  {
    subheader: '',
    items: [],
  },
  {
    subheader: '기타',
    items: [
      { title: '정비소 계정 보기', path: paths.mechanicView },
      { title: '점검 중', path: paths.maintenance },
      { title: '곧 출시 예정', path: paths.comingsoon },
      { title: '404 오류', path: paths.page404 },
      { title: '500 오류', path: paths.page500 },
    ],
  },
];

export const navData = [
  { title: '서비스 메인', path: '/' },
  { title: '공지사항', path: paths.notices },
  { title: '이벤트', path: paths.events },
  { title: '서비스', path: '/none', children: pageLinks },
  { title: '정비소 검색', path: paths.map },
  { title: '고객센터', path: paths.contact },
];
