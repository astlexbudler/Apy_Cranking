import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProfilePartnerView } from 'src/sections/view/account/profile-partner-view';



// 정비소 프로필 상세 정보 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const account = {
  id: 201,
  images: [`${CONFIG.assetsDir}/assets/images/account/mechanic1.png`, `${CONFIG.assetsDir}/assets/images/account/mechanic2.png`, `${CONFIG.assetsDir}/assets/images/account/mechanic3.png`],
  email: 'yongwoo.park@email.com',
  nickname: '우리 정비소',
  title: '내차처럼 소중히 다루겠습니다.',
  lastLogin: '2025-01-05 13:45',
  dateJoined: '2022-06-15 11:10',
  tel: '01098765432',
  address: '경기도 고양시 일산동구 중앙로 1035',
  lat: 37.658445,
  lon: 126.832078,
  avgRate: 4.8,
  isSns: true,
  isEmail: true,
  deviceToken: 'deviceToken_mechanic_yongwoo',
  note: '출장 정비 가능. 사업자 번호 123-45-67890, 정비소 등록 완료(관리자 메모)',
};

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProfilePartnerView account={account} />
    </>
  );
}
