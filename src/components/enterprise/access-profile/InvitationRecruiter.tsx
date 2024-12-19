import axios from 'axios';
import React, { useState } from 'react'
import InvitationRecruiterData from '../../../types/InvitationRecruiterData';
import { Alert, Box, Button, CircularProgress, Divider, Snackbar, TextField, Typography } from '@mui/material';

const InvitationRecruiter: React.FC = () => {

    const enterpriseId = localStorage.getItem("userId");
    const URL_INVITATION_RECRUITER = `http://localhost:8080/recruiter/createAccount/${enterpriseId}`;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);

    const [InvitationRecruiter, setInvitationRecruiter] = useState({
        name: "",
        email: "",
    })

    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validateFields = () => {
        const newErrors: { name?: string; email?: string } = {};

        if (!InvitationRecruiter.name.trim()) {
            newErrors.name = "O campo nome é obrigatório.";
        }

        if (!InvitationRecruiter.email.trim()) {
            newErrors.email = "O campo email é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(InvitationRecruiter.email)) {
            newErrors.email = "O email deve estar em um formato válido.";
        }

        return newErrors;
    };

    const handleSubmit = async () => {

        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            await axios.post<InvitationRecruiterData>(URL_INVITATION_RECRUITER, InvitationRecruiter)

            setLoading(false);
            setSendEmail(true);

            setInvitationRecruiter({
                name: "",
                email: "",
            });

            setErrors({});
            window.location.reload();
        } catch (error) {
            setOpenSnackbar(true);
            setLoading(false);
            setSendEmail(false);
        }
    }

    const handleChange = (field: keyof InvitationRecruiterData, value: any) => {
        setInvitationRecruiter((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    return (
        <Box sx={{
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

            <Typography variant='h6'>
                Convidar recrutador
            </Typography>

            <Divider sx={{ borderStyle: 'dashed', borderColor: '#87aa68' }} />

            <TextField
                label="Nome"
                name="name"
                value={InvitationRecruiter?.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                size="small"
            />

            <TextField
                label="Email"
                name="email"
                value={InvitationRecruiter?.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                size="small"
            />

            <Button
                sx={{ bgcolor: '#87aa68', color: 'white' }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? <CircularProgress size={30} sx={{ color: '#fff' }} /> : "Enviar"}
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >

                {!sendEmail ?                 
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Erro ao convidar recrutador.
                    </Alert>
                    : 
                    ''
                }
            </Snackbar>
        </Box>
    )
}

export default InvitationRecruiter