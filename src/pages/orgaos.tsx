import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OrgaosView } from 'src/sections/orgaos/view';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Órgãos - ${CONFIG.appName}`}</title>
      </Helmet>

      <OrgaosView />
    </>
  );
}
