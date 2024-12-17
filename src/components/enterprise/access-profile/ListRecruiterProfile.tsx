import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecruiterData from '../../../types/RecruiterData';

import { Box, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const ListRecruiterProfile: React.FC = () => {

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
            gap: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            padding: '30px'
        }}>
            {recruiterData && recruiterData.length > 0 ?
                recruiterData.map((profile, index) => (
                    <Box sx={{
                        display: 'flex',
                        width: '80%',
                        justifyContent: 'space-between',
                        border: '1px solid black',
                        borderRadius: '8px',
                        padding: '14px',
                    }}>
                        <Box>
                            <Typography>{profile.name}</Typography>
                            <Typography>{profile.email}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                            <Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <FiberManualRecordIcon sx={{
                                        color: profile.invitationStatus === 'ATIVO'
                                            ? 'green'
                                            : profile.invitationStatus === 'PENDENTE'
                                                ? 'yellow'
                                                : profile.invitationStatus === 'INATIVO'
                                                    ? 'red'
                                                    : 'gray',

                                        fontSize: '14px'
                                    }} />
                                    <Typography>{profile.invitationStatus}</Typography>
                                </Box>
                                <Typography sx={{}}>{profile.accountType}</Typography>
                            </Box>

                            <KeyboardArrowRightIcon />
                        </Box>
                    </Box>
                )) : 'Nenhum perfil encontrado.'}
        </Box>
    )
};

export default ListRecruiterProfile;