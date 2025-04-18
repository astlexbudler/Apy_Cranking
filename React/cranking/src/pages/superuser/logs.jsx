import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SearchLogView } from 'src/sections/view/log/search-log-view';



// 채팅 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const logs = [{
  id: 0,
  message: '[파트너 가입] 000 정비소 계정으로 가입 신청이 있습니다.',
  createdAt: '2023-10-01 12:00',
}, {
  id: 1,
  message: '[사용자 가입] 000 사용자님이 회원가입을 하였습니다.',
  createdAt: '2023-10-01 12:00',
}, {
  id: 2,
  message: '[차량 등록] 000 사용자님이 차량 (12가 1234)를 등록하였습니다.',
  createdAt: '2023-10-01 12:00',
}, {
  id: 3,
  message: '[정비 요청 생성] 000 사용자님이 정비 요청을 생성하였습니다.',
  createdAt: '2023-10-01 12:00',
}]

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SearchLogView logs={logs} />
    </>
  );
}
