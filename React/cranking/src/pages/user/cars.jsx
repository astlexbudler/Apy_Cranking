import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SearchCarView } from 'src/sections/view/car/search-car-view';



// 내 차량 정보 조회 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const cars = [
  {
    id: 1,
    images: [`${CONFIG.assetsDir}/assets/images/car/car1.jpg`, `${CONFIG.assetsDir}/assets/images/car/car2.jpg`, `${CONFIG.assetsDir}/assets/images/car/car3.jpg`],
    number: '12가 1234',
    identificationNumber: 'KMHE341ABCD567890',
    name: '쏘렌토 MQ4',
    manufacturer: '기아',
    carType: 'SUV',
    carSize: '대형',
    year: '2023',
    cc: '2200',
    fuel: '디젤',
    transmission: '자동',
    color: '진회색',
  },
  {
    id: 2,
    images: [`${CONFIG.assetsDir}/assets/images/car/car1.jpg`, `${CONFIG.assetsDir}/assets/images/car/car2.jpg`, `${CONFIG.assetsDir}/assets/images/car/car3.jpg`],
    number: '35나 5678',
    identificationNumber: 'KMHG341XYZT123456',
    name: '그랜저 GN7',
    manufacturer: '현대',
    carType: '세단',
    carSize: '대형',
    year: '2024',
    cc: '3000',
    fuel: 'LPG',
    transmission: '자동',
    color: '검정',
  },
  {
    id: 3,
    images: [`${CONFIG.assetsDir}/assets/images/car/car1.jpg`, `${CONFIG.assetsDir}/assets/images/car/car2.jpg`, `${CONFIG.assetsDir}/assets/images/car/car3.jpg`],
    number: '88가 9012',
    identificationNumber: 'KNABX512LCJ789321',
    name: '레이',
    manufacturer: '기아',
    carType: '경차',
    carSize: '소형',
    year: '2022',
    cc: '1000',
    fuel: '가솔린',
    transmission: '자동',
    color: '민트',
  },
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SearchCarView cars={cars} />
    </>
  );
}
