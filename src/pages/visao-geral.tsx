import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { VisaoView } from 'src/sections/visaogeral/view/visao-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Visão Geral - ${CONFIG.appName}`}</title>
      </Helmet>

      <VisaoView />
    </>
  );
}
