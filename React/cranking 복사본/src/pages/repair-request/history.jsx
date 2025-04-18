import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { HistoryView } from 'src/sections/repair-request/view/history-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Travel - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <HistoryView />
        </>
    );
}
