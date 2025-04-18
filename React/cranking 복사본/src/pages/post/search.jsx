import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SearchView } from 'src/sections/post/view/search-view';

// ----------------------------------------------------------------------

const metadata = { title: `Post list | E-learning - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <SearchView />
        </>
    );
}
