import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProfileMechanicView } from 'src/sections/view/account/profile-mechanic-view';



// 정비소 프로필 상세 정보 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const account = {
  id: 201,
  images: [
    { id: 0, image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png` },
    { id: 1, image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png` },
    { id: 2, image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png` },
  ],
  email: 'yongwoo.park@email.com',
  nickname: '우리 정비소',
  title: '20년 경력의 차량 전문가',
  lastLogin: '2025-01-05 13:45',
  dateJoined: '2022-06-15 11:10',
  accountType: '정비사',
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

const reviews = [
  {
    id: 1,
    writer: {
      id: 101,
      nickname: '이수민',
      accountType: '사용자',
    },
    target: {
      id: 201,
      nickname: '명진카센터',
      accountType: '정비소',
    },
    photo: `${CONFIG.assetsDir}/assets/images/review/review1.jpg`,
    content: '빠르게 수리해주셔서 너무 감사드려요! 소음 문제도 깔끔히 해결됐습니다.',
    rate: 5,
    createdAt: '2025-04-16 14:32',
  },
  {
    id: 2,
    writer: {
      id: 102,
      nickname: '홍성우',
      accountType: '사용자',
    },
    target: {
      id: 202,
      nickname: '강남모터스',
      accountType: '정비소',
    },
    photo: null,
    content: '엔진오일 교체하러 방문했는데, 친절하고 작업도 빨랐습니다.',
    rate: 4,
    createdAt: '2025-04-15 09:47',
  },
  {
    id: 3,
    writer: {
      id: 103,
      nickname: '김채연',
      accountType: '사용자',
    },
    target: {
      id: 203,
      nickname: '오토닥터',
      accountType: '정비소',
    },
    photo: `${CONFIG.assetsDir}/assets/images/review/review3.jpg`,
    content: '정확한 진단 덕분에 수리비도 절감하고 안심됐어요. 추천합니다!',
    rate: 5,
    createdAt: '2025-04-14 18:12',
  },
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProfileMechanicView account={account} reviews={reviews} />
    </>
  );
}
