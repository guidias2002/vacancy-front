import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecruiterData from '../../../types/RecruiterData';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';

const RecruiterDetails: React.FC<{ onBack: () => void; recruiterId: number }> = ({ onBack, recruiterId }) => {

    const entepriseId = localStorage.getItem("userId");

    const URL_RECRUITER_BY_ID = `http://localhost:8080/recruiter/findRecruiterById/${recruiterId}`;
    const URL_DISABLE_RECRUITER_ACCOUNT = `http://localhost:8080/enterprise/disableRecruiterAccount/enterpriseId/${entepriseId}/recruiterId/${recruiterId}`
    const [recruiter, setRecruiter] = useState<RecruiterData | null>(null);

    useEffect(() => {

        axios.get<RecruiterData>(URL_RECRUITER_BY_ID)
            .then((response) => (
                setRecruiter(response.data)
            ))
            .catch((error) => (
                console.log("Erro ao buscar recrutador.")
            ))

    }, [recruiterId]);

    const handleSubmit = async () => {

        try {
            await axios.put(URL_DISABLE_RECRUITER_ACCOUNT)
            window.location.reload();
            console.log("Recrutador desabilitado com sucesso.")
        } catch (error) {
            console.log("Erro ao desabilitar recrutador.")
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                height: 'auto',
                padding: '20px',
                margin: '20px',
                borderRadius: '5px',
                gap: 2,
                border: '1px solid rgba(151, 166, 138, 0.47)'
            }}>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,


                }}

            >

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <CloseIcon
                        onClick={onBack}
                        sx={{
                            cursor: 'pointer',
                            ":hover": {
                                bgcolor: 'rgba(227, 227, 227, 0.56)',
                                borderRadius: '100px',
                            }
                        }} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Typography>{recruiter?.name}</Typography>
                        <Typography>{recruiter?.email}</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center'
                        }}
                    >
                        <FiberManualRecordIcon
                            sx={{
                                color: recruiter?.invitationStatus === 'ATIVO'
                                    ? 'green'
                                    : recruiter?.invitationStatus === 'PENDENTE'
                                        ? '#d1b906'
                                        : recruiter?.invitationStatus === 'INATIVO'
                                            ? 'red'
                                            : 'gray',

                                fontSize: '14px'
                            }}
                        />
                        <Typography>{recruiter?.invitationStatus}</Typography>
                    </Box>
                </Box>

                <Typography>{recruiter?.accountType === 'RECRUITER' ? 'Recrutador' : ''}</Typography>

                <Box>
                    <Typography>Criado</Typography>
                    <Typography>{new Date(recruiter?.createdAt || '').toLocaleString()}</Typography>
                </Box>

                <Box>
                    <Typography>Última atualização</Typography>
                    <Typography>{new Date(recruiter?.updatedAt || '').toLocaleString()}</Typography>
                </Box>

            </Box>


            {recruiter?.invitationStatus === 'INATIVO' ?
                <Button sx={{ mt: 2, bgcolor: 'fff', color: '#87aa68', border: '1px solid #87aa68' }}>
                    Habilitar Recrutador
                </Button>
                :
                <Button onClick={handleSubmit} sx={{ mt: 2, bgcolor: 'fff', color: 'red', border: '1px solid red' }}>
                    Desabilitar Recrutador
                </Button>   
            }

        </Box>
    )
}

export default RecruiterDetails;