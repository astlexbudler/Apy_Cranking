// 컴포넌트에서 라우팅 경로를 사용할 수 있도록 미리 정의된 경로 상수들입니다.
// 각 페이지의 경로를 상수로 정의하여 코드의 가독성을 높이고, 경로 변경 시 한 곳에서만 수정하면 되도록 합니다.

export const paths = {

  /**
  * 메인 및 기타 페이지들
  */
  signIn: '/', // 로그인 페이지
  signUp: '/sign-up', // 회원가입 페이지
  verify: '/verify', // 인증 페이지
  reset: '/reset', // 비밀번호 재설정 페이지
  notice: '/posts/notice', // 공지사항 페이지
  event: '/posts/event', // 이벤트 페이지
  post: '/post', // 게시글 페이지
  chat: '/chat', // 채팅 페이지
  map: '/map', // 지도 페이지
  mechanicView: '/mechanic-view', // 정비사 페이지
  contact: '/contact', // 고객센터 페이지
  terms: '/terms', // 이용약관 페이지
  maintenance: '/maintenance', // 점검 페이지
  comingsoon: '/coming-soon', // 준비중 페이지
  page404: '/404', // 페이지 없음
  page500: '/500', // 서버 오류 페이지

  /**
  * 사용자 페이지들
  */
  user: {
    main: '/user', // 사용자 메인 페이지
    profile: '/user/profile', // 사용자 프로필 페이지
    cars: '/user/cars', // 차량 관리 페이지
    carRegister: '/user/car-register', // 차량 등록 페이지
    carModify: '/user/car-modify', // 차량 수정 페이지
    repairRequests: '/user/repair-requests', // 정비 요청 페이지
    repairRequest: '/user/repair-request', // 정비 요청 상세 페이지
    repairRequestWrite: '/user/repair-request-write', // 정비 요청 작성 페이지
  },

  /**
  * 파트너 페이지들
  */
  partner: {
    main: '/partner', // 파트너 메인 페이지
    profile: '/partner/profile', // 파트너 프로필 페이지
    repairRequests: '/partner/repair-requests', // 정비 요청 페이지
    repairRequest: '/partner/repair-request', // 정비 요청 상세 페이지
  },

  /**
  * 관리자 페이지들
  */
  superuser: {
    main: '/superuser', // 관리자 메인 페이지
    profile: '/superuser/profile', // 관리자 프로필 페이지
    posts: '/superuser/posts', // 게시글 관리 페이지
    postWrite: '/superuser/post-write', // 게시글 작성 페이지
    postEdit: '/superuser/post-edit', // 게시글 수정 페이지
    accounts: '/superuser/accounts', // 사용자 관리 페이지
    account: '/superuser/account', // 사용자 상세 페이지
    repairRequests: '/superuser/repair-requests', // 정비 요청 관리 페이지
    repairRequest: '/superuser/repair-request', // 정비 요청 상세 페이지
  },

};
