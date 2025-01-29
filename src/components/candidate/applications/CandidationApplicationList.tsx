import { useEffect, useState } from "react";
import { Application } from "../../../types/ApplicationData";
import axios from "axios";
import CandidationApplication from "./CandidationApplication";

import Loading from "../../Loading";
import '../../../styles/CandidationApplicationList.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CandidateApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const storedCandidateId = localStorage.getItem("userId");

  useEffect(() => {
    if (storedCandidateId) {
      axios.get<Application[]>(`http://localhost:8080/candidacy/candidateId/${storedCandidateId}`)
        .then(response => {
          setApplications(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar vagas:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error('Candidate ID não encontrado no localStorage');
      setLoading(false);
    }
  }, [storedCandidateId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <TableContainer>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell><Typography color='#87aa68' fontWeight="bold">ID da Vaga</Typography></TableCell>
            <TableCell><Typography color='#87aa68' fontWeight="bold">Empresa</Typography></TableCell>
            <TableCell><Typography color='#87aa68' fontWeight="bold">Vaga</Typography></TableCell>
            <TableCell><Typography color='#87aa68' fontWeight="bold">Aplicado em</Typography></TableCell>
            <TableCell><Typography fontWeight="bold"></Typography></TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ width: '100%' }}>
          {applications && applications.length > 0 ?
            applications.map(application => (
                <CandidationApplication key={application.id} application={application} />
            )) : <Typography sx={{ marginTop: '20px' }}>Nenhuma candidatura encontrada.</Typography>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidateApplicationList;