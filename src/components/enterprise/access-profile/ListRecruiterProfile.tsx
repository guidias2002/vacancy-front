import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecruiterData from '../../../types/RecruiterData';

import { Box, Divider, Typography } from '@mui/material';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonIcon from '@mui/icons-material/Person';

const ListRecruiterProfile: React.FC<{ onRecruiterClick: (id:number) => void }> = ({ onRecruiterClick }) => {

    const enterpriseId = localStorage.getItem("userId");
    const URL_GETALL_PROFILE_BY_ENTERPRISEID = `http://localhost:8080/recruiter/findAllRecruitersByEnterpriseId/${enterpriseId}`;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recruiterData, setRecruiterData] = useState<RecruiterData[] | null>(null);

    useEffect(() => {
        axios.get<RecruiterData[]>(URL_GETALL_PROFILE_BY_ENTERPRISEID)
            .then((response) => {
                setRecruiterData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setError("Erro ao buscar perfis.");
                setLoading(false);
            })
    }, [enterpriseId]);


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            width: '70%',
        }}>
            {recruiterData && recruiterData.length > 0 ?
                recruiterData.map((profile, index) => (
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(151, 166, 138, 0.47)',
                        padding: '14px',
                        ':hover': {
                            backgroundColor: 'rgba(193, 224, 166, 0.07)',
                            cursor: 'pointer',
                        },
                    }}
                        key={index}
                        onClick={() => onRecruiterClick(profile.id)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PersonIcon sx={{ color: '#87aa68', fontSize: '20px' }} />

                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }}>{profile.name}</Typography>
                                <Typography sx={{ color: '#242423' }}>{profile.email}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

                                <Typography sx={{}}>{profile.accountType ? 'Recrutador' : ''}</Typography>

                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <FiberManualRecordIcon sx={{
                                        color: profile.invitationStatus === 'ATIVO'
                                            ? 'green'
                                            : profile.invitationStatus === 'PENDENTE'
                                                ? '#d1b906'
                                                : profile.invitationStatus === 'INATIVO'
                                                    ? 'red'
                                                    : 'gray',

                                        fontSize: '14px'
                                    }} />
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{profile.invitationStatus}</Typography>
                                </Box>
                            </Box>

                            <KeyboardArrowRightIcon />

                        </Box>

                    </Box>
                )) : <Typography sx={{ padding: '20px 0' }}>Nenhum perfil encontrado.</Typography>}
        </Box>
    )
};

export default ListRecruiterProfile;