import type { IUsuario, IEndereco } from 'src/api/types';

import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Grid,
  Button,
  Divider,
  TextField,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';

import { axiosInstanceAuthenticated } from 'src/api/api';

const EditarUsuarioView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [originalData, setOriginalData] = useState<IUsuario | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user data
  const fetchUsuario = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstanceAuthenticated(`users/${id}`);
      const { data } = response.data;
      setUsuario(data);
      setOriginalData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUsuario();
  }, [fetchUsuario]);

  // Handle input changes for user fields
  const handleInputChange = (field: keyof IUsuario, value: string) => {
    if (!usuario) return;
    const updatedUsuario = { ...usuario, [field]: value };
    setUsuario(updatedUsuario);
    setIsModified(JSON.stringify(updatedUsuario) !== JSON.stringify(originalData));
  };

  // Handle changes in address fields
  const handleAddressChange = (field: keyof IEndereco, value: string) => {
    if (!usuario) return;
    const updatedAddress = { ...usuario.endereco, [field]: value };
    const updatedUsuario = { ...usuario, endereco: updatedAddress };

    // @ts-ignore 
    setUsuario(updatedUsuario);
    setIsModified(JSON.stringify(updatedUsuario) !== JSON.stringify(originalData));
  };

  // Save changes
  const handleSave = async () => {
    if (!usuario) return;

    setLoading(true);
    try {
      const response = await axiosInstanceAuthenticated(`users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: usuario,
      });

      if (response.status === 200) {
        alert('Dados do usuário atualizados com sucesso.');
        fetchUsuario(); // Refresh data after save
        setIsModified(false);
      } else {
        alert('Erro ao salvar dados do usuário.');
      }
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      alert('Erro ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !usuario) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!usuario) {
    return <Typography>Usuário não encontrado ou dados indisponíveis.</Typography>;
  }

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Editando Usuário - {usuario.nome}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nome"
            value={usuario.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={usuario.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefone"
            value={usuario.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
          />
        </Grid>
      </Grid>

      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="h6">Endereço</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Rua"
            value={usuario?.endereco?.logradouro}
            onChange={(e) => handleAddressChange('logradouro', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cidade"
            value={usuario?.endereco?.cidade}
            onChange={(e) => handleAddressChange('cidade', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Estado"
            value={usuario?.endereco?.estado}
            onChange={(e) => handleAddressChange('estado', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="CEP"
            value={usuario?.endereco?.cep}
            onChange={(e) => handleAddressChange('cep', e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        {isModified && (
          <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EditarUsuarioView;
