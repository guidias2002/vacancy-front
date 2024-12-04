import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import Language from '../../../types/Language';


const LanguageForm: React.FC = () => {

const candidateId = localStorage.getItem("candidateId");
const [language, setLanguage] = useState<Language>({
    id: 0,
    language: "",
    level: ""
});

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
};

const handleSubmit = async () => {
    try {
        await axios.post(`http://localhost:8080/language/candidateId/${candidateId}`, language);

        console.log("Salvo com sucesso.");
        setLanguage({
            id: 0,
            language: "",
            level: "",
        });
    } catch (error) {
        console.log("Erro ao salvar idioma.", error);
    }
}

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                maxWidth: '100%',
                margin: "0 auto",
                padding: 2
            }}
        >
            <FormControl fullWidth>
    <Autocomplete
        options={languages}
        value={language.language}
        onChange={(event, newValue) => handleChange("language", newValue || "")}
        renderInput={(params) => <TextField {...params} label="Idioma" />}
    />
</FormControl>

<FormControl fullWidth>
    <Autocomplete
        options={levels}
        value={language.level}
        onChange={(event, newValue) => handleChange("level", newValue || "")}
        renderInput={(params) => <TextField {...params} label="Nível" />}
    />
</FormControl>

            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#87aa68", color: "white", width: '30%' }}>
                Salvar
            </Button>
        </Box>
    );
}

export default LanguageForm;