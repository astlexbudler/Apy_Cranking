import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PlayerView } from 'src/sections/_examples/player-view';

// ----------------------------------------------------------------------

const metadata = { title: `Player | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlayerView />
    </>
  );
}
