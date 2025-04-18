import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { VerifyView } from 'src/sections/account/view/verify-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Layout illustration - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <VerifyView />
    </>
  );
}
