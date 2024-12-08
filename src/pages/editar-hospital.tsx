import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EditHospitalView from 'src/sections/hospitais/view/editar-hospital-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Hospitais - ${CONFIG.appName}`}</title>
      </Helmet>

      <EditHospitalView />
    </>
  );
}
