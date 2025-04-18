import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SignInView } from 'src/sections/view/terms-view';



// 로그인 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignInView />
    </>
  );
}
