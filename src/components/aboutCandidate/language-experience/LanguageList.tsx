import { Autocomplete, Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Language from '../../../types/Language';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const LanguageList: React.FC = () => {

    const candidateId = localStorage.getItem("candidateId");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const [language, setLanguage] = useState<Language[] | null>(null);


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


    useEffect(() => {
        if (!candidateId) {
            setError("ID do candidato não encontrado.");
            setLoading(false);
            return;
        }

        axios.get<Language[]>(`http://localhost:8080/language/getLanguagesByCandidateId/${candidateId}`)
            .then((response) => {
                setLanguage(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Erro ao buscar as idiomas.");
                setLoading(false);
            })
    }, [candidateId]);

    const onDelete = async (id: number) => {
        try {
            axios.delete(`http://localhost:8080/language/delete/${id}`);
            window.location.reload();
        } catch (error) {
            console.log("Erro ao excluir idioma.", error);
        }
    }

    const handleChange = (field: keyof Language, value: string) => {
        setLanguage((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {language && language.length > 0 ? (
                language.map((lang, index) => (
                    <>
                        {editId === lang.id ?

                            <Box sx={{
                                width: '100%', display: 'flex', flexDirection: 'column', gap: 2, padding: '20px 10px',
                                border: '1px solid #87aa68',
                                borderRadius: '5px'
                            }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            options={languages}
                                            value={lang.language}
                                            onChange={(event, newValue) => handleChange("language", newValue || "")}
                                            renderInput={(params) => <TextField {...params} label="Idioma" />}
                                            fullWidth
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <Autocomplete
                                            options={levels}
                                            value={lang.level}
                                            onChange={(event, newValue) => handleChange("level", newValue || "")}
                                            renderInput={(params) => <TextField {...params} label="Nível" />}
                                            fullWidth
                                        />
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <Button
                                        onClick={() => onDelete(lang.id)}
                                        sx={{ color: 'white', bgcolor: 'red' }}>
                                        Remover
                                    </Button>

                                    <Button
                                        onClick={() => setEditId(0)}
                                        sx={{ color: 'black', bgcolor: 'white', border: '1px solid black' }}>
                                        Cancelar
                                    </Button>

                                    <Button sx={{ color: 'white', bgcolor: '#87aa68' }}>Salvar</Button>
                                </Box>
                            </Box> :

                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    alignItems: 'center',
                                    padding: '10px',
                                    border: '1px solid #87aa68',
                                    borderRadius: '5px'
                                }}
                            >
                                <Typography>{lang.language}</Typography>
                                <Typography sx={{ textAlign: 'left' }}>{lang.level}</Typography>

                                <EditOutlinedIcon key={index} onClick={() => setEditId(lang.id)} sx={{ cursor: 'pointer' }} />
                            </Box>}
                    </>
                ))
            ) : (
                <Typography>Nenhum idioma encontrado.</Typography>
            )}
        </Box>

    )
}

export default LanguageList