import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Application } from '../../../types/ApplicationData';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ApplicationCard from '../../ApplicationCard';

const ListEnterpriseApplication = () => {

    const enterpriseId = localStorage.getItem("userId");
    const URL_ENTERPRISE_APPLICATIONS = `http://localhost:8080/candidacy/enterpriseId/${enterpriseId}`;

    const [applications, setApplications] = useState<Application[] | null>(null);

    useEffect(() => {

        axios.get<Application[]>(URL_ENTERPRISE_APPLICATIONS)
            .then((response) => {
                setApplications(response.data);
            })
            .catch((error) => {
                console.log("Erro ao buscar candidaturas.", error)
            })
    }, [enterpriseId])


    return (
        <TableContainer>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography color='#87aa68' fontWeight="bold">ID da Vaga</Typography></TableCell>
                        <TableCell><Typography color='#87aa68' fontWeight="bold">Vaga</Typography></TableCell>
                        <TableCell><Typography color='#87aa68' fontWeight="bold">Candidato</Typography></TableCell>
                        <TableCell><Typography color='#87aa68' fontWeight="bold">Aplicado em</Typography></TableCell>
                        <TableCell><Typography fontWeight="bold"></Typography></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody sx={{ width: '100%' }}>
                    {applications && applications.length > 0 ?
                        applications.map(application => (
                            <ApplicationCard key={application.id} application={application} />
                        )) : 'Nenhuma candidatura encontrada.'
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListEnterpriseApplication;