import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Vacancy } from '../../../types/VacancyData';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import VacancyCard from '../../VacancyCard';

interface ListVacancyByEnterpriseProps {
    maxVacancies: number;
}

const ListVacancyByEnterpriseAboutMe: React.FC<ListVacancyByEnterpriseProps> = ({ maxVacancies }) => {
    const enterpriseId = localStorage.getItem("userId");
    const URL_VACANCY_BY_ENTERPRISEID = `http://localhost:8080/vacancy/findVacancyByEnterpriseId/basicInformation/${enterpriseId}`;

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    //var nameEnterprise = vacancies[0].name_enterprise;

    useEffect(() => {
        axios.get<Vacancy[]>(URL_VACANCY_BY_ENTERPRISEID)
            .then((response) => {
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log("Erro ao buscar vagas.", error);
            });
    }, [enterpriseId]);

    const startIndex = currentPage * maxVacancies;
    const endIndex = startIndex + maxVacancies;
    const displayedVacancies = vacancies.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (endIndex < vacancies.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='grid gap-2'>
            <p className="font-[500] text-[22px]">Algumas oportunidades na </p>
            <Box sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>

                <IconButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    sx={{
                        zIndex: 10,
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                        '&:disabled': { backgroundColor: '#e0e0e0', color: '#a0a0a0' },
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        width: '100%'
                    }}
                >

                    {displayedVacancies.length > 0 ? (
                        displayedVacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))
                    ) : (
                        <Typography>Nenhuma vaga encontrada.</Typography>
                    )}
                </Box>

                <IconButton
                    onClick={handleNextPage}
                    disabled={endIndex >= vacancies.length}
                    sx={{
                        zIndex: 10,
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                        '&:disabled': { backgroundColor: '#e0e0e0', color: '#a0a0a0' },
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </div>
    );
};


export default ListVacancyByEnterpriseAboutMe;