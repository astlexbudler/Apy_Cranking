import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SettingsView } from 'src/sections/view/setting/settings-view';



// 로그인 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SettingsView />
    </>
  );
}
