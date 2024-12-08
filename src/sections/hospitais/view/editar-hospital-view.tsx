import type { IHospital, IEndereco } from "src/api/types";

import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

import {
  Box,
  Grid,
  Button,
  Divider,
  TextField,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import { axiosInstanceAuthenticated } from "src/api/api";

const EditHospitalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState<IHospital | null>(null);
  const [originalData, setOriginalData] = useState<IHospital | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

// Fetch hospital data
const fetchHospital = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axiosInstanceAuthenticated(`hospitais/${id}`);
    const { data } = response.data;
    setHospital(data);
    setOriginalData(data);
  } catch (error) {
    console.error("Failed to fetch hospital data:", error);
  } finally {
    setLoading(false);
  }
}, [id]); // Dependência do ID

// Load hospital data on mount
useEffect(() => {
  fetchHospital();
}, [fetchHospital]);


  // Handle changes in hospital fields
  const handleInputChange = (field: keyof IHospital, value: string) => {
    if (!hospital) return;
    const updatedHospital = { ...hospital, [field]: value };
    setHospital(updatedHospital);
    setIsModified(JSON.stringify(updatedHospital) !== JSON.stringify(originalData));
  };

  // Handle changes in address fields
  const handleAddressChange = (field: keyof IEndereco, value: string) => {
    if (!hospital) return;
    const updatedAddress = { ...hospital.endereco, [field]: value };
    const updatedHospital = { ...hospital, endereco: updatedAddress };
    setHospital(updatedHospital);
    setIsModified(JSON.stringify(updatedHospital) !== JSON.stringify(originalData));
  };

  // Save changes
  const handleSave = async () => {
    if (!hospital) return;

    setLoading(true);
    try {
      const response = await axiosInstanceAuthenticated(`hospitais/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: hospital,
      });

      if (response.status === 200) {
        alert("Dados do hospital atualizados com sucesso.");
        fetchHospital(); // Refresh data after save
      } else {
        alert("Falha ao salvar dados do hospital.");
      }
    } catch (error) {
      console.error("Failed to save hospital:", error);
      alert("Ocorreu um erro ao salvar os dados.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !hospital) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!hospital) {
    return <Typography>Dados do hospital não encontrados.</Typography>;
  }

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Editando Hospital - {hospital.nome}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nome"
            value={hospital.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefone"
            value={hospital.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={hospital.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Grid>
      </Grid>

      <Divider style={{ margin: "20px 0" }} />
      <Typography variant="h6">Endereço</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Rua"
            value={hospital.endereco.logradouro}
            onChange={(e) => handleAddressChange("logradouro", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cidade"
            value={hospital.endereco.cidade}
            onChange={(e) => handleAddressChange("cidade", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Estado"
            value={hospital.endereco.estado}
            onChange={(e) => handleAddressChange("estado", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="CEP"
            value={hospital.endereco.cep}
            onChange={(e) => handleAddressChange("cep", e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        {isModified && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EditHospitalPage;
