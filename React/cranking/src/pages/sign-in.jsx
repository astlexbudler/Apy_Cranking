import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AccountSignInView } from 'src/sections/view/account/account-sign-in-view';



// 로그인 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountSignInView />
    </>
  );
}
