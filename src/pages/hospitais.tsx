import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { HospitaisView } from 'src/sections/hospitais/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Hospitais - ${CONFIG.appName}`}</title>
      </Helmet>

      <HospitaisView />
    </>
  );
}
