import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { RegisterView } from 'src/sections/account/view/detail-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
