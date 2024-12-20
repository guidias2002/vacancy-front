import React from 'react'
import { Vacancy } from '../types/VacancyData'
import { RiComputerFill } from 'react-icons/ri';
import { FaBriefcase, FaMoneyBill } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Box, Divider, Typography } from '@mui/material';

interface VacancyCardProps {
    vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e0e0e0',
            borderRadius: '14px',
            padding: '20px',
            bgcolor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            height: '250px',
            justifyContent: 'space-evenly'
        }}>


            <Box>
                <Typography sx={{ fontWeight: 'bold' }}>{vacancy.title}</Typography>
                <Typography sx={{ fontSize: '14px' }}>{vacancy.name_enterprise}</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                alignContent: 'center',
                gap: 4,
                width: '100%',
                justifyContent: 'space-between'
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <RiComputerFill color='#87aa68' />
                        <span>{vacancy.modality}</span>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }} >
                        <FaBriefcase color='#87aa68' />
                        <span>{vacancy.level}</span>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }} >
                        <FaLocationDot color='#87aa68' />
                        <span>{vacancy.location}</span>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }} >
                        <FaMoneyBill color='#87aa68' />
                        <span>{vacancy.remuneration}</span>
                    </Box>
                </Box>
            </Box>

            <Divider />

            <Typography>
                Publicada em: {new Date(vacancy.createdAt).toLocaleDateString('pt-BR')}
            </Typography>
        </Box>
    )
}

export default VacancyCard