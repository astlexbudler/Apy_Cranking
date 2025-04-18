import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { RegisterCarView } from 'src/sections/view/car/register-car-view';



// 차량 등록 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RegisterCarView />
    </>
  );
}
