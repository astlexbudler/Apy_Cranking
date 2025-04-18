import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ContactView } from 'src/sections/contact/view/contact-view';

// ----------------------------------------------------------------------

const metadata = { title: `Contact us | E-learning - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ContactView />
        </>
    );
}
