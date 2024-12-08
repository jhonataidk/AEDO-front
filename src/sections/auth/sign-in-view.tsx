import type { FormEvent, ChangeEvent } from 'react';
import type { ApiResponse, Credentials } from 'src/api/types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Link,
  Alert,
  Button,
  Snackbar,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { axiosInstanceUnauthenticated } from 'src/api/api';

import { Iconify } from 'src/components/iconify';


export function LoginView() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await axiosInstanceUnauthenticated.post<ApiResponse>('login', credentials);
      const {usuario, token } = response.data;


        // Salva o token e perfil do usuário no localStorage
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_profile', JSON.stringify(usuario));
        localStorage.setItem('id_usuario', usuario.id.toString());

        console.log('Usuário autenticado:', usuario);
        navigate('/'); // Redireciona após login

    } catch (errorReq: any) {
      console.error('Erro na autenticação:', errorReq);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        required
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Senha"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={credentials.password}
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
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Não possui uma conta?{' '}
          <Link
            href="/registro"
            variant="subtitle2"
            underline="hover"
          >
            Cadastre-se
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Falha na autenticação! Verifique suas credenciais e tente novamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
