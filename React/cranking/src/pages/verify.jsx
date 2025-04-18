import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AccountVerifyView } from 'src/sections/view/account/account-verify-view';




// 이메일 인증 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountVerifyView />
    </>
  );
}
