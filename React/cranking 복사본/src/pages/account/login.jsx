import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { LoginView } from 'src/sections/account/view/login-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Layout illustration - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LoginView />
    </>
  );
}
