import type { IEndereco, IHospital } from "src/api/types";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const CreateHospitalPage: React.FC = () => {
  const navigate = useNavigate();

  const [hospital, setHospital] = useState<any>({
    nome: "",
    telefone: "",
    email: "",
    endereco: {
      logradouro: "",
      cep: "",
      estado: "",
      cidade: "",
    },
  });
  const [loading, setLoading] = useState(false);

  // Handle changes in hospital fields
  const handleInputChange = (field: keyof IHospital, value: string) => {
    const updatedHospital = { ...hospital, [field]: value };
    setHospital(updatedHospital);
  };

  // Handle changes in address fields
  const handleAddressChange = (field: keyof IEndereco, value: string) => {
    const updatedAddress = { ...hospital.endereco, [field]: value };
    setHospital({ ...hospital, endereco: updatedAddress });
  };

  // Save new hospital
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axiosInstanceAuthenticated("hospitais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: hospital,
      });

      if (response.status === 201) {
        alert("Hospital criado com sucesso.");
        navigate("/hospitais"); // Redireciona para a lista de hospitais
      } else {
        alert("Falha ao criar hospital.");
      }
    } catch (error) {
      console.error("Failed to create hospital:", error);
      alert("Ocorreu um erro ao criar o hospital.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Criar Novo Hospital</Typography>
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
        <Button variant="outlined" onClick={() => navigate("/hospitais")}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Salvar"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateHospitalPage;
