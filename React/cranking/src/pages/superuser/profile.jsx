import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProfileSuperuserView } from 'src/sections/view/account/profile-superuser-view';



// 관리자 프로필 상세 정보 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const account = {
  id: 101,
  email: 'cranking@email.com',
  nickname: '크랭킹 관리자',
  title: '',
  lastLogin: '2025-01-06 10:15',
  dateJoined: '2024-12-01 08:40',
  accountType: '관리자',
  tel: '01012345678',
  address: '서울특별시 마포구 월드컵북로 396',
  lat: 37.566821,
  lon: 126.901073,
  isSns: false,
  isEmail: true,
  deviceToken: 'deviceToken_user_jiyoon',
  note: '',
};

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProfileSuperuserView account={account} />
    </>
  );
}
