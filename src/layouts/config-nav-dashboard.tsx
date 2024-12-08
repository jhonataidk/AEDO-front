import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Visão Geral',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Usuários',
    path: '/usuarios',
    icon: icon('ic-user'),
  },
  {
    title: 'Hospitais',
    path: '/hospitais',
    icon: icon('ic-hospital'),
  },
  {
    title: 'Orgãos',
    path: '/orgaos',
    icon: icon('ic-orgaos'),
  }
];
