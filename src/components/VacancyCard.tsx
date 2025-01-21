import React from 'react'
import { Vacancy } from '../types/VacancyData'
import { RiComputerFill } from 'react-icons/ri';
import { FaBriefcase, FaMoneyBill } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface VacancyCardProps {
    vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {

    const accountType = localStorage.getItem("accountType");

    console.log(vacancy.status + "aquiiiiiii")

    const navigate = useNavigate();

    const redirectVacancyDetailsPage = () => {
        navigate(`/vacancy/${vacancy.id}`)
    }

    return (
        <div
        className='flex flex-col border border-gray-300 rounded-[14px] p-5 bg-white shadow-md box-border h-[250px] justify-evenly font-montserrat hover:cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
            onClick={redirectVacancyDetailsPage}
        >


            <div className='flex flex-col'>
                <p className='text-base font-bold'>{vacancy.title}</p>
                <p className='text-sm'>{vacancy.name_enterprise}</p>
            </div>

            <div className='flex items-center gap-4 w-full justify-between'>
                <div>
                    <div className='flex items-center gap-1'>
                        <RiComputerFill color='#87aa68' />
                        <p>{vacancy.modality}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <FaBriefcase color='#87aa68' />
                        <p>{vacancy.level}</p>
                    </div>
                </div>

                <div>
                    <div className='flex items-center gap-1'>
                        <FaLocationDot color='#87aa68' />
                        <p>{vacancy.location}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <FaMoneyBill color='#87aa68' />
                        <p>{vacancy.remuneration}</p>
                    </div>
                </div>
            </div>

            <Divider />

            <div className='flex gap-1'>
                <p className='text-sm font-semibold'>Publicada em: </p>
                <p className='text-sm'>{new Date(vacancy.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>

            {accountType === 'ENTERPRISE' ? 
            <p>{vacancy.status}</p> 
            : null}
        </div>
    )
}

export default VacancyCard