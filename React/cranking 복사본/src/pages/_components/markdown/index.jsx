import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MarkdownView } from 'src/sections/_examples/markdown-view';

// ----------------------------------------------------------------------

const metadata = { title: `Markdown | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MarkdownView />
    </>
  );
}
