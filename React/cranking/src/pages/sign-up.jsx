import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AccountSignUpView } from 'src/sections/view/account/account-sign-up-view';



// 회원가입 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountSignUpView />
    </>
  );
}
