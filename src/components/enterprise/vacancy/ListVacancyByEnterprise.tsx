import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Vacancy } from '../../../types/VacancyData';
import { Box, Typography } from '@mui/material';

import VacancyCard from '../../VacancyCard';


const ListVacancyByEnterprise: React.FC = () => {
    const enterpriseId = localStorage.getItem("userId");
    const URL_VACANCY_BY_ENTERPRISEID = `http://localhost:8080/vacancy/findVacancyByEnterpriseId/basicInformation/${enterpriseId}`;

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    useEffect(() => {
        axios.get<Vacancy[]>(URL_VACANCY_BY_ENTERPRISEID)
            .then((response) => {
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log("Erro ao buscar vagas.", error);
            });
    }, [enterpriseId]);


    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gridTemplateRows: 'auto',
            gap: '20px',
            width: '100%'
        }}>
            {vacancies && vacancies.length > 0 ?
                vacancies?.map(vacancy => (
                    <VacancyCard vacancy={vacancy} />

                )) : <Typography>Nenhuma vaga encontrada.</Typography>}
        </Box>
    );
};


export default ListVacancyByEnterprise;