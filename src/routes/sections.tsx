import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const DoadoresPage = lazy(() => import('src/pages/doadores'));
export const OrgaosPage = lazy(() => import('src/pages/orgaos'));
export const RegistroOrgaosPage = lazy(() => import('src/pages/registro-orgaos'));
export const VisaoGeralPage = lazy(() => import('src/pages/visao-geral'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const HospitalPage = lazy(() => import('src/pages/hospitais'));
export const EditarUsuarioPage = lazy(() => import('src/pages/usuario/editar-usuario'));
export const EditarHospitalPage = lazy(() => import('src/pages/editar-hospital'));
export const CriarHospitalPage = lazy(() => import('src/pages/criar-hospital'));

// ----------------------------------------------------------------------

// Verifica se o token está presente no localStorage
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

// Verifica se o perfil do usuário corresponde a algum dos IDs permitidos
const isAuthorized = (allowedProfiles: number[]): boolean => {
  const userProfile = localStorage.getItem('user_profile');
  if (userProfile) {
    const { id_perfil } = JSON.parse(userProfile);
    return allowedProfiles.includes(id_perfil);
  }
  return false;
};

// Componente de proteção para rotas autenticadas
const ProtectedRoute = ({
  children,
  allowedProfiles,
}: {
  children: JSX.Element;
  allowedProfiles: number[];
}): JSX.Element => {
  console.log('allowedProfiles', allowedProfiles);
  if (!isAuthenticated()) {
    console.log('Não autenticado');
    return <Navigate to="/login" replace />;
  }
  console.log()
  if (!isAuthorized(allowedProfiles)) {
    return <Navigate to="/404" replace />;
  }
  return children;
};

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <ProtectedRoute allowedProfiles={[1, 2,3]}>
              <VisaoGeralPage />
            </ProtectedRoute>
          ),
          index: true,
        },
        {
          path: 'usuarios',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <DoadoresPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/orgaos',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <OrgaosPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/orgaos/novo',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <RegistroOrgaosPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/visao-geral',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <VisaoGeralPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/hospitais',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <HospitalPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/hospital/:id',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <EditarHospitalPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/usuario/:id',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <EditarUsuarioPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/hospital/novo',
          element: (
            <ProtectedRoute allowedProfiles={[1]}>
              <CriarHospitalPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '/registro',
      element: <SignUpPage />,
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
