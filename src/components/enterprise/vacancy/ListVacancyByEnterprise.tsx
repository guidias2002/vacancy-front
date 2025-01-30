import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Vacancy } from '../../../types/VacancyData';
import { Box, Typography } from '@mui/material';

import VacancyCard from '../../VacancyCard';
import FilterVacancyByStatus from './FilterVacancyByStatus';


const ListVacancyByEnterprise: React.FC = () => {
    const enterpriseId = localStorage.getItem("userId");
    const URL_VACANCY_BY_ENTERPRISEID = `http://localhost:8080/vacancy/findVacancyByEnterpriseId/basicInformation/${enterpriseId}`;

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

    useEffect(() => {
        axios.get<Vacancy[]>(URL_VACANCY_BY_ENTERPRISEID)
            .then((response) => {
                setVacancies(response.data);
                setFilteredVacancies(response.data);
            })
            .catch((error) => {
                console.log("Erro ao buscar vagas.", error);
            });
    }, [enterpriseId]);


    const handleFilterChange = (status: string) => {
        setSelectedStatus(status);

        if (status == 'ALL') {
            setFilteredVacancies(vacancies)
        } else {
            const filtered = vacancies.filter(vacancie => vacancie.status === status);
            setFilteredVacancies(filtered);
        }
    }


    return (
        <div className='grid gap-6'>
            <FilterVacancyByStatus onFilterChange={handleFilterChange} />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gridTemplateRows: 'auto',
                gap: '20px',
                width: '100%'
            }}>
                {filteredVacancies && filteredVacancies.length > 0 ?
                    filteredVacancies.map(vacancy => (
                        <VacancyCard vacancy={vacancy} />

                    )) : <Typography>Nenhuma vaga encontrada.</Typography>}
            </Box>
        </div>
    );
};


export default ListVacancyByEnterprise;