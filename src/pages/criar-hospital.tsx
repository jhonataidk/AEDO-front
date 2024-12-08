import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CreateHospitalPage from 'src/sections/hospitais/view/criar-hospital-view';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Hospitais - ${CONFIG.appName}`}</title>
      </Helmet>

      <CreateHospitalPage />
    </>
  );
}
