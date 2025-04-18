import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ModifyView } from 'src/sections/car/view/modify-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Travel - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ModifyView />
        </>
    );
}
