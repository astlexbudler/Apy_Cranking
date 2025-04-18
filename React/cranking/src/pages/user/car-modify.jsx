import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ModifyCarView } from 'src/sections/view/car/modify-car-view';



// 차량 정보 수정 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const car = {
  id: 1,
  images: [`${CONFIG.assetsDir}/assets/images/car/car1.png`, `${CONFIG.assetsDir}/assets/images/car/car2.png`, `${CONFIG.assetsDir}/assets/images/car/car3.png`],
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
};

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ModifyCarView car={car} />
    </>
  );
}
