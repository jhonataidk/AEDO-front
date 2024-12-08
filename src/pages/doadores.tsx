import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { DoadoresView } from 'src/sections/doadores/view';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Doadores - ${CONFIG.appName}`}</title>
      </Helmet>

      <DoadoresView />
    </>
  );
}
