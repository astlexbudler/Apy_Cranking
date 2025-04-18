import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AccountResetView } from 'src/sections/view/account/account-reset-view';



// 비밀번호 재설정 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountResetView />
    </>
  );
}
