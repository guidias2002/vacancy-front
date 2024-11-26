import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

interface AcademicExperience {
    id: number;
    course: string;
    institution: string;
    level: string;
    status: string;
    monthStart: string;
    yearStart: number;
    monthEnd: string;
    yearEnd: number;
}

const AcademicExperienceList: React.FC = () => {
    const [academicExperiences, setAcademicExperiences] = useState<AcademicExperience[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const candidateId = localStorage.getItem("candidateId");

    useEffect(() => {
        if (!candidateId) {
            setError("ID do candidato não encontrado.");
            setLoading(false);
            return;
        }

        axios
            .get<AcademicExperience[]>(`http://localhost:8080/academicExperience/getAllExperienceAcademy/candidateId/${candidateId}`)
            .then((response) => {
                setAcademicExperiences(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Erro ao buscar as experiências acadêmicas.");
                setLoading(false);
            });
    }, [candidateId]);


    const handleDeleteAcademicExperience = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/academicExperience/deleteAcademicExperience/${id}`);
            console.log("Excluído com sucesso");
    
            setAcademicExperiences((prev) => {
                return prev ? prev.filter((exp) => exp.id !== id) : null;
            });
        } catch (error) {
            console.error("Erro ao excluir experiência:", error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {academicExperiences && academicExperiences.length > 0 ? (
                academicExperiences.map((experience, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "16px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                            <Typography>{experience.course}</Typography>
                            <Typography>{experience.institution}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Nível</Typography>
                                <Typography>{experience.level}</Typography>
                            </Box>

                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Status</Typography>
                                <Typography>{experience.status}</Typography>
                            </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Início</Typography>
                                <Typography>
                                    {experience.monthStart} {experience.yearStart}
                                </Typography>
                            </Box>

                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Conclusão (ou previsão)</Typography>
                                <Typography>
                                    {experience.monthEnd} {experience.yearEnd}
                                </Typography>
                            </Box>
                        </Box>

                        <Button onClick={() => handleDeleteAcademicExperience(experience.id)}><DeleteIcon/></Button>
                    </Box>
                ))
            ) : (
                <Typography>Nenhuma experiência acadêmica encontrada.</Typography>
            )}
        </Box>
    );
};

export default AcademicExperienceList;
