import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ComingSoonView } from 'src/sections/view/coming-soon-view';



// 정비소 프로필 상세 정보 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
