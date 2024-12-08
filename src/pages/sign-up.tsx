import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RegistroView } from 'src/sections/auth/registro';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Sign in - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegistroView />
    </>
  );
}
