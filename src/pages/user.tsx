import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Doadores - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
