import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { NotFoundView } from 'src/sections/view/error/not-found-view';



// 404 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName} - 404 알 수 없는 페이지입니다.` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
