import type { IHospital} from 'src/api/types';

import { useNavigate } from 'react-router-dom';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type HospitalTableRowProps = {
  row: IHospital;
};

export function HospitalTableRow({ row }: HospitalTableRowProps) {
  const handleRemover = () => {
    console.log('Remover');
  };
  const navigate = useNavigate();

  const handleNavigateToHospital = () => {
    navigate(`/hospital/${row.id}`);
  }

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell>{row.nome}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.telefone}</TableCell>
        <TableCell>
          {row.endereco.cidade} - {row.endereco.estado}
        </TableCell>


        <TableCell align="right">
          <IconButton onClick={handleNavigateToHospital}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          <IconButton onClick={handleRemover}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ color: 'error.main' }} />
          </IconButton>
        </TableCell>
      </TableRow>
  );
}
