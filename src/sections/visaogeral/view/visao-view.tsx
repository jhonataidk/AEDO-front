import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  TableContainer,
  CircularProgress,
} from "@mui/material";

import { axiosInstanceAuthenticated } from "src/api/api";

export const VisaoView: React.FC = () => {
  const navigate = useNavigate();
  const [orgaos, setOrgaos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obter o ID do usuário do localStorage
  const id_usuario = localStorage.getItem("id_usuario");

  // Redireciona para login se id_usuario não for encontrado
  useEffect(() => {
    if (!id_usuario) {
      console.error("Usuário não encontrado no localStorage.");
      alert("ID do usuário não encontrado. Faça login novamente.");
      navigate("/login");
    }
  }, [id_usuario, navigate]);

  // Buscar dados dos órgãos associados ao usuário
  const fetchOrgaos = useCallback(async () => {
    if (!id_usuario) return; // Previne execução se id_usuario for nulo
    setLoading(true);
    try {
      const response = await axiosInstanceAuthenticated.get(`/usuario-orgao/usuario/${id_usuario}`);
      if (response.data?.data) {
        setOrgaos(response.data.data);
      } else {
        setOrgaos([]);
      }
    } catch (error) {
      console.error("Erro ao carregar os órgãos associados:", error);
      alert("Erro ao carregar os órgãos associados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [id_usuario]);

  // Executa fetchOrgaos quando o componente é montado
  useEffect(() => {
    fetchOrgaos();
  }, [fetchOrgaos]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Órgãos Associados</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome do Órgão</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgaos.length > 0 ? (
              orgaos.map((orgao) => (
                <TableRow key={orgao.id}>
                  <TableCell>{orgao.id}</TableCell>
                  <TableCell>{orgao.orgao.nome}</TableCell>
                  <TableCell>{orgao.orgao.para_doacao ? "Para Doação" : "Esperando Doação"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Nenhum órgão associado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
