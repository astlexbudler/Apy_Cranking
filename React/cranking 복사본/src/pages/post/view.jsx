import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { DetailView } from 'src/sections/post/view/detail-view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details | E-learning - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <DetailView />
        </>
    );
}
