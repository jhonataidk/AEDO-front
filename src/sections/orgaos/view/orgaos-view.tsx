import type { IUsuarioOrgao } from "src/api/types";

import React, { useState, useEffect } from "react";

import {
  Box,
  Table,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  TableContainer,
  CircularProgress,
} from "@mui/material";

import { axiosInstanceAuthenticated } from "src/api/api"; // Importando a interface
import { useNavigate } from "react-router-dom";

export function OrgaosView() {
  const [usuarioOrgaos, setUsuarioOrgaos] = useState<IUsuarioOrgao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstanceAuthenticated.get("usuario-orgao");
        setUsuarioOrgaos(response.data.data || []); // Garante que o estado seja sempre um array
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">Orgãos Associados aos Usuários</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/orgaos/novo")}>
          Adicionar Órgão
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Órgão</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Perfil</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarioOrgaos.length > 0 ? (
              usuarioOrgaos.map((usuarioOrgao) => (
                <TableRow key={usuarioOrgao.id}>
                  <TableCell>{usuarioOrgao.id}</TableCell>
                  <TableCell>{usuarioOrgao.orgao.nome}</TableCell>
                  <TableCell>{usuarioOrgao.usuario.nome}</TableCell>
                  <TableCell>{usuarioOrgao.usuario.perfil?.nome || "N/A"}</TableCell>
                  <TableCell>
                    {usuarioOrgao.usuario.endereco
                      ? `${usuarioOrgao.usuario.endereco.logradouro}, ${usuarioOrgao.usuario.endereco.cidade} - ${usuarioOrgao.usuario.endereco.estado}`
                      : "Endereço não disponível"}
                  </TableCell>
                  <TableCell>
                    {usuarioOrgao.orgao.para_doacao ? "Para Doação" : "Esperando Doação"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhuma associação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
