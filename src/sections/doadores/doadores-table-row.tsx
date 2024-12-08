import type { IUsuario } from 'src/api/types';

import { useNavigate } from 'react-router-dom';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------


type UserTableRowProps = {
  row: IUsuario;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {

  const navigate = useNavigate();



  const handleEditar = () => {
    navigate(`/usuario/${row.id}`);
  }

  const handleRemover = () => {
    console.log('Remover');
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{row.nome}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.telefone}</TableCell>
        <TableCell>{row?.perfil?.nome}</TableCell>
        <TableCell>{row?.endereco?.cidade} - {row?.endereco?.estado}</TableCell>
{/* 
        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleEditar}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          <IconButton onClick={handleRemover}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ color: 'error.main' }} />
          </IconButton>
        </TableCell>
        
      </TableRow>
      {/* <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList> */}

    </>
  );
}
