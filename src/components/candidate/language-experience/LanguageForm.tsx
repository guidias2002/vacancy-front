import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import Language from '../../../types/Language';
import AddIcon from '@mui/icons-material/Add';


const LanguageForm: React.FC = () => {

    const candidateId = localStorage.getItem("userId");
    const [createLanguage, setCreateLanguage] = useState(false);
    const [language, setLanguage] = useState<Language>({
        id: 0,
        language: "",
        level: ""
    });
    const [errors, setErrors] = useState({ language: '', level: '' });

    const languages = [
        "Inglês",
        "Mandarim",
        "Hindi",
        "Espanhol",
        "Francês",
        "Árabe",
        "Bengali",
        "Russo",
        "Português",
        "Urdu",
        "Indonésio",
        "Alemão",
        "Japonês",
        "Punjabi",
        "Coreano",
        "Vietnamita",
        "Turco",
        "Italiano",
        "Tailandês",
        "Gujarati",
        "Marata",
        "Telugo",
        "Tâmil",
        "Persa",
        "Javanês"
    ];

    const levels = [
        "Básico",
        "Intermediário",
        "Avançado",
        "Nativo/Fluente"
    ]

    const handleChange = (field: keyof Language, value: string) => {
        setLanguage((prev) => ({ ...prev, [field]: value }));
        setErrors({ ...errors, [field]: value ? '' : 'Campo obrigatório' });
    };

    const handleSubmit = async () => {
        const newErrors = {
            language: language.language ? '' : 'Campo obrigatório',
            level: language.level ? '' : 'Campo obrigatório',
        };

        setErrors(newErrors);

        const existsError = await existsByLanguage();
        if(existsError) {
            setErrors({ language: existsError, level: '' });
            return;
        }

        if (!newErrors.language && !newErrors.level) {
            console.log("Dados enviados:", language);
            setCreateLanguage(false);
        }

        try {
            await axios.post(`http://localhost:8080/language/candidateId/${candidateId}`, language);

            console.log("Salvo com sucesso.");
            setLanguage({
                id: 0,
                language: "",
                level: "",
            });
            window.location.reload();
        } catch (error) {
            console.log("Erro ao salvar idioma.", error);
        }
    }

    const existsByLanguage = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/language/existsByLanguage/${language.language}`)

            if(response.data) {
                return 'Idioma já existe.';
            }
        }catch (error) {
            console.error("Erro ao verificar idioma.", error);
            return 'Erro ao verificar idioma.';
        }
    }

    return (

        <>
            {createLanguage ?
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        width: '100%',
                        margin: "0 auto",
                        alignItems: 'flex-start',
                    }}
                >
                    <FormControl fullWidth>
                        <Autocomplete
                            options={languages}
                            value={language.language}
                            onChange={(event, newValue) => handleChange("language", newValue || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Idioma"
                                    error={!!errors.language}
                                    helperText={errors.language}
                                />}
                            size='small'
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <Autocomplete
                            options={levels}
                            value={language.level}
                            onChange={(event, newValue) => handleChange("level", newValue || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Nível"
                                    error={!!errors.level}
                                    helperText={errors.level}
                                />}
                            size='small'
                        />
                    </FormControl>

                    <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#87aa68", color: "white", width: '30%' }}>
                        Salvar
                    </Button>

                    <Button variant="contained" onClick={() => setCreateLanguage(false)} sx={{ color: '#6e6f70', width: '30%', bgcolor: 'white', border: '1px solid #6e6f70' }}>
                        Cancelar
                    </Button>
                </Box>
                :
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: "1px solid #87aa68",
                        borderRadius: "4px",
                        padding: "20px 16px",
                        cursor: 'pointer'
                    }}
                    onClick={() => setCreateLanguage(true)}
                >
                    <Typography sx={{ fontWeight: 'bold', color: '#87aa68' }}>Adicionar Idioma</Typography>
                    <AddIcon sx={{ color: '#87aa68' }} />
                </Box>
            }
        </>
    );
}

export default LanguageForm;