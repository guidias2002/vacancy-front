import axios from 'axios';
import React, { useState } from 'react'
import InvitationRecruiterData from '../../../types/InvitationRecruiterData';
import { Box, Button, TextField } from '@mui/material';

const InvitationRecruiter: React.FC = () => {

    const enterpriseId = localStorage.getItem("userId");
    const URL_INVITATION_RECRUITER = `http://localhost:8080/recruiter/createAccount/${enterpriseId}`;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
            console.log("Convite enviado.")

            setLoading(false);

            setInvitationRecruiter({
                name: "",
                email: "",
            });

            setErrors({});
            window.location.reload();
        } catch (error) {
            console.log("Erro ao enviar convite.")
            setLoading(false);
        }
    }

    const handleChange = (field: keyof InvitationRecruiterData, value: any) => {
        setInvitationRecruiter((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };


    return (
        <Box>
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

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
            </Button>
        </Box>
    )
}

export default InvitationRecruiter