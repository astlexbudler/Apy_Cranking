import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { Error500View } from 'src/sections/view/error/500-view';



// 500 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName} - 500 서버 오류입니다.` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Error500View />
    </>
  );
}
