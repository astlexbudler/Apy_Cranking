import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MapView } from 'src/sections/view/map-view';



// 지도 검색 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const accounts = [
  {
    id: 1,
    images: [
      { id: 0, image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png` },
      { id: 1, image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png` },
      { id: 2, image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png` },
    ],
    email: 'yongwoo.park@email.com',
    nickname: '우리 정비소',
    title: '20년 경력의 차량 전문가',
    accountType: '정비사',
    tel: '01098765432',
    address: '경기도 고양시 일산동구 중앙로 1035',
    lat: 37.658445,
    lon: 126.832078,
    avgRate: 4.8,
  },
  {
    id: 2,
    images: [
      { id: 0, image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png` },
      { id: 1, image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png` },
      { id: 2, image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png` },
    ],
    email: 'cardoc@email.com',
    nickname: '수입 자동차 변원',
    title: '수입차 전문 정비소',
    accountType: '정비사',
    tel: '01098765432',
    address: '서울특별시 강남구 테헤란로 123',
    lat: 37.658445,
    lon: 127.032078,
    avgRate: 4.9,
  }
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MapView accounts={accounts} />
    </>
  );
}
