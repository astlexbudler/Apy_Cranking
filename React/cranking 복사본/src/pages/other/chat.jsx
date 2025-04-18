import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ChatView } from 'src/sections/chat/view/chat_view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Travel - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChatView />
    </>
  );
}
