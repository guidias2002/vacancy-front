import { Alert, Box, Button, CircularProgress, Divider, Paper, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecruiterData from '../../../types/RecruiterData';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmRecruiterDeactivation from '../access-profile/ConfirmRecruiterDeactivation';

const RecruiterDetails: React.FC<{ onBack: () => void; recruiterId: number }> = ({ onBack, recruiterId }) => {

    const entepriseId = localStorage.getItem("userId");

    const URL_RECRUITER_BY_ID = `http://localhost:8080/recruiter/findRecruiterById/${recruiterId}`;
    const URL_RESEND_EMAIL_TO_RECRUITER = `http://localhost:8080/recruiter/resendEmailtoRecruiter/${recruiterId}`;
    const URL_ENABLE_RECRUITER_ACCOUNT = `http://localhost:8080/enterprise/enableRecruiterAccount/enterpriseId/${entepriseId}/recruiterId/${recruiterId}`;

    const [recruiter, setRecruiter] = useState<RecruiterData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [resendEmail, setResendEmail] = useState(false);
    const [openConfirmRecruiterDeactivation, setOpenConfirmRecruiterDeactivation] = useState(false);

    useEffect(() => {

        axios.get<RecruiterData>(URL_RECRUITER_BY_ID)
            .then((response) => (
                setRecruiter(response.data)
            ))
            .catch((error) => (
                console.log("Erro ao buscar recrutador.")
            ))

    }, [recruiterId]);

    const enableRecruiterAccount = async () => {

        try {
            await axios.put(URL_ENABLE_RECRUITER_ACCOUNT)
            window.location.reload();
            console.log("Recrutador habilitado com sucesso.")
        } catch (error) {
            console.log("Erro ao habilitar recrutador.")
        }
    }

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const resendEmailToRecruiter = async () => {

        setLoading(true);

        try {
            await axios.post(URL_RESEND_EMAIL_TO_RECRUITER)

            setOpenSnackbar(true);
            setLoading(false);
            setResendEmail(true);
        } catch (error) {
            setOpenSnackbar(true);
            setLoading(false);
            setResendEmail(false);
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
                border: '1px solid #87aa68',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
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
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >

                    <Box
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon sx={{ color: '#87aa68', fontSize: '20px' }} />
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{recruiter?.name}</Typography>
                        </Box>


                    </Box>

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

                <Divider sx={{ borderStyle: 'dashed', borderColor: '#87aa68' }} />

                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#87aa68', fontSize: '11px', marginBottom: '3px' }}>CARGO</Typography>
                    <Typography>{recruiter?.accountType === 'RECRUITER' ? 'Recrutador' : ''}</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >

                    <Box>
                        <Typography sx={{ fontWeight: 'bold', color: '#87aa68', fontSize: '11px', marginBottom: '3px' }}>EMAIL</Typography>
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
                        <Typography sx={{ fontWeight: 'bold' }}>{recruiter?.invitationStatus}</Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#87aa68', fontSize: '11px', marginBottom: '3px' }}>CRIADO</Typography>
                    <Typography>{new Date(recruiter?.createdAt || '').toLocaleString()}</Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#87aa68', fontSize: '11px', marginBottom: '3px' }}>ÚLTIMA ATUALIZAÇÃO</Typography>
                    <Typography>{new Date(recruiter?.updatedAt || '').toLocaleString()}</Typography>
                </Box>

            </Box>


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {recruiter?.invitationStatus !== 'INATIVO' ?
                    <Button onClick={resendEmailToRecruiter} sx={{ mt: 2, bgcolor: 'fff', color: '#87aa68', border: '1px solid #87aa68' }}>
                        {loading ? <CircularProgress size={30} sx={{ color: '#87aa68' }} /> : 'Reenviar email'}
                    </Button>
                    :
                    ''
                }

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >

                    {resendEmail ?
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Email enviado com sucesso!
                        </Alert>
                        :
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Erro ao reenviar email.
                        </Alert>
                    }
                </Snackbar>

                {recruiter?.invitationStatus === 'INATIVO' ?
                    <Button onClick={enableRecruiterAccount} sx={{ mt: 2, bgcolor: 'fff', color: '#87aa68', border: '1px solid #87aa68' }}>
                        Habilitar Recrutador
                    </Button>
                    :
                    <Button onClick={() => setOpenConfirmRecruiterDeactivation(true)} sx={{ mt: 2, bgcolor: 'fff', color: 'red', border: '1px solid red' }}>
                        Desabilitar Recrutador
                    </Button>

                }
                {openConfirmRecruiterDeactivation ?
                    <ConfirmRecruiterDeactivation
                        open={openConfirmRecruiterDeactivation}
                        id={recruiterId}
                        setOpen={setOpenConfirmRecruiterDeactivation}
                    /> : null}
            </Box>

        </Box>
    )
}

export default RecruiterDetails;