import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Radio,
  Button,
  TextField,
  Container,
  Typography,
  RadioGroup,
  Autocomplete,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";

import { axiosInstanceAuthenticated } from "src/api/api";

const RegistroOrgaoPage: React.FC = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>("");
  const [paraDoacao, setParaDoacao] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [usuarios, setUsuarios] = useState<{ value: number; label: string }[]>([]);
  const [hospitais, setHospitais] = useState<{ value: number; label: string }[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [dropdownLoading, setDropdownLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      setDropdownLoading(true);
      try {
        // Fetch usuários (doador ou receptor)
        const usuariosResponse = await axiosInstanceAuthenticated.get("users", {
          params: { tipo: 2 },
        });

        setUsuarios(
          Array.isArray(usuariosResponse.data.data)
            ? usuariosResponse.data.data.map((user: any) => ({
                value: user.id,
                label: user.nome,
              }))
            : []
        );

        // Fetch hospitais
        const hospitaisResponse = await axiosInstanceAuthenticated.get("hospitais");
        setHospitais(
          Array.isArray(hospitaisResponse.data.data)
            ? hospitaisResponse.data.data.map((hospital: any) => ({
                value: hospital.id,
                label: hospital.nome,
              }))
            : []
        );
      } catch (error) {
        console.error("Erro ao buscar dados de dropdown:", error);
        alert("Erro ao carregar usuários e hospitais.");
      } finally {
        setDropdownLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSave = async () => {
    if (!selectedUsuario || !selectedHospital) {
      alert("Usuário e hospital devem ser selecionados.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstanceAuthenticated.post("usuario-orgao", {
        orgao: {
          nome,
          para_doacao: paraDoacao,
        },
        usuario: {
          id: selectedUsuario,
        },
        hospital: {
          id: selectedHospital,
        },
      });
      

      if (response.status === 201) {
        alert("Órgão registrado com sucesso!");
        navigate("/orgaos");
      } else {
        alert("Falha ao registrar órgão.");
      }
    } catch (error) {
      console.error("Erro ao registrar órgão:", error);
      alert("Ocorreu um erro ao registrar o órgão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const renderRadioOptions = () => (
    <RadioGroup
      value={paraDoacao}
      onChange={(e) => setParaDoacao(e.target.value === "true")}
    >
      <FormControlLabel value control={<Radio />} label="Para Doação" />
      <FormControlLabel value={false} control={<Radio />} label="Esperando Doação" />
    </RadioGroup>
  );

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Registrar Órgão</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome do Órgão"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Status</Typography>
          {renderRadioOptions()}
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={usuarios || []}
            getOptionLabel={(option) => option.label}
            onChange={(_, value) => setSelectedUsuario(value?.value || null)}
            loading={dropdownLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione o Usuário"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {dropdownLoading ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={hospitais || []}
            getOptionLabel={(option) => option.label}
            onChange={(_, value) => setSelectedHospital(value?.value || null)}
            loading={dropdownLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione o Hospital"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {dropdownLoading ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={() => navigate("/orgaos")}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading || !nome || !selectedUsuario || !selectedHospital}
        >
          {loading ? "Salvando..." : "Registrar"}
        </Button>
      </Box>
    </Container>
  );
};

export default RegistroOrgaoPage;
