import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MaintenanceView } from 'src/sections/maintenance/view/maintenance-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Travel - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <MaintenanceView />
        </>
    );
}
