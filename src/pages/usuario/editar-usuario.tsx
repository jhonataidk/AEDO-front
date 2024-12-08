import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EditarUsuarioView from 'src/sections/user/view/editar-usuario';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Hospitais - ${CONFIG.appName}`}</title>
      </Helmet>

      <EditarUsuarioView />
    </>
  );
}
