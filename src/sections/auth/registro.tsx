import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Alert,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { axiosInstanceUnauthenticated } from 'src/api/api';

import { Iconify } from 'src/components/iconify';

export function RegistroView() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    password_confirmation: '',
    telefone: '',
    id_perfil: '',
    endereco: {
      logradouro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        endereco: { ...prevState.endereco, [field]: value },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axiosInstanceUnauthenticated.post('registrar', formData);
      alert('Registrado com sucesso!');
      navigate('/login');
    } catch (erroReq: any) {
      console.error('Erro no registro:', erroReq);
      setError(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Registro
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Senha"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? (
                      <Iconify icon="solar:eye-bold" />
                    ) : (
                      <Iconify icon="solar:eye-closed-bold" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirme a Senha"
            name="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Perfil"
            name="id_perfil"
            value={formData.id_perfil}
            onChange={handleChange}
            required
            error={!formData.id_perfil}
            helperText={!formData.id_perfil ? 'O perfil é obrigatório' : ''}
          >
            <MenuItem value="2">Doador</MenuItem>
            <MenuItem value="3">Receptor</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Logradouro"
            name="endereco.logradouro"
            value={formData.endereco.logradouro}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cidade"
            name="endereco.cidade"
            value={formData.endereco.cidade}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Estado"
            name="endereco.estado"
            value={formData.endereco.estado}
            onChange={(e) =>
              handleChange({
                target: { name: e.target.name, value: e.target.value.slice(0, 2) },
              })
            }
            required
            inputProps={{ maxLength: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="CEP"
            name="endereco.cep"
            value={formData.endereco.cep}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
        Registrar
      </Button>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Falha no registro! Verifique os dados e tente novamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
