import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TermsView } from 'src/sections/terms/view/terms-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Travel - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <TermsView />
        </>
    );
}
