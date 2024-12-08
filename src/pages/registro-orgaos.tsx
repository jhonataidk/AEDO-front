import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import RegistroOrgaoPage from 'src/sections/orgaos/view/registro-orgaos';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Órgãos - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegistroOrgaoPage/>
    </>
  );
}
