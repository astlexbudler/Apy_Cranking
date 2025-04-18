import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProfileSearchView } from 'src/sections/view/account/profile-search-view';



// 채팅 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const accounts = [{
  id: 101,
  email: 'jiyoon.lee@email.com',
  nickname: '이지윤',
  title: '',
  lastLogin: '2025-01-06 10:15',
  dateJoined: '2024-12-01 08:40',
  accountType: '사용자',
  tel: '01012345678',
  address: '서울특별시 마포구 월드컵북로 396',
  lat: 37.566821,
  lon: 126.901073,
  isSns: false,
  isEmail: true,
  deviceToken: 'deviceToken_user_jiyoon',
  note: '자주 차량 점검을 받는 사용자(관리자 메모)',
},
{
  id: 102,
  email: 'hyeyoun@email.com',
  nickname: '이혜연',
  title: '',
  lastLogin: '2025-01-06 10:15',
  dateJoined: '2024-12-01 08:40',
  accountType: '사용자',
  tel: '01012345678',
  address: '서울특별시 마포구 월드컵북로 396',
  lat: 37.566821,
  lon: 126.901073,
  isSns: false,
  isEmail: true,
  deviceToken: 'deviceToken_user_hyeyoun',
  note: '자주 차량 점검을 받는 사용자(관리자 메모)',
},
{
  id: 103,
  email: 'minji.kim@email.com',
  nickname: '김민지',
  title: '',
  lastLogin: '2025-01-07 14:20',
  dateJoined: '2024-12-02 09:30',
  accountType: '사용자',
  tel: '01098765432',
  address: '서울특별시 강남구 테헤란로 123',
  lat: 37.508876,
  lon: 127.063162,
  isSns: true,
  isEmail: false,
  deviceToken: 'deviceToken_user_minji',
  note: '최근 가입한 사용자(관리자 메모)',
}]

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProfileSearchView accounts={accounts} />
    </>
  );
}
