import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProfileDetailView } from 'src/sections/view/account/profile-detail-view';



// 프로필 상세 정보 페이지(관리자용)
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const account = {
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
};

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProfileDetailView account={account} />
    </>
  );
}
