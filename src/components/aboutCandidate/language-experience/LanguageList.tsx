import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Language from '../../../types/Language';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const LanguageList: React.FC = () => {

    const candidateId = localStorage.getItem("candidateId");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<Language[] | null>(null);

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


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {language && language.length > 0 ? (
                language.map((lang, index) => (
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
                        <DeleteOutlineIcon
                            sx={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => onDelete(lang.id)}
                        />
                    </Box>
                ))
            ) : (
                <Typography>Nenhum idioma encontrado.</Typography>
            )}
        </Box>

    )
}

export default LanguageList