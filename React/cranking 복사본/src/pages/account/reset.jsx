import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ResetView } from 'src/sections/account/view/reset-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Layout illustration - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ResetView />
    </>
  );
}
