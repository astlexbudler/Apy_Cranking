import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { UserView } from 'src/sections/account/view/user-view';

// ----------------------------------------------------------------------

const metadata = { title: `Personal | Account - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <UserView />
        </>
    );
}
