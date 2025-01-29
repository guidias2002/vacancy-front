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
        <div className='grid gap-6'>
            <p className="font-[500] text-[22px]">Confira algumas vagas disponíveis:</p>
            {displayedVacancies.length > 0 ? (
                <div className='max-w-full flex justify-center items-center gap-4'>

                    <IconButton
                        onClick={handlePreviousPage}
                        className="bg-white shadow-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 rounded-full p-2 h-10 w-10 flex items-center justify-center"
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <div className='flex w-full gap-2'>
                        {displayedVacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))}
                    </div>

                    <IconButton
                        className="bg-white shadow-md hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 rounded-full p-2 h-10 w-10 flex items-center justify-center"
                        onClick={handleNextPage}
                        disabled={endIndex >= vacancies.length}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                </div>
            ) : (
                <p>Nenhuma vaga encontrada.</p>
            )}
        </div>
    );
};


export default ListVacancyByEnterpriseAboutMe;