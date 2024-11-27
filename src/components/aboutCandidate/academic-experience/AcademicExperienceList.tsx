import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Dialog, DialogContent } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import AcademicExperience from "../../../types/AcademicExperience";
import EditAcademicExperienceForm from "./EditAcademicExperienceFormProps";

const AcademicExperienceList: React.FC = () => {
    const [academicExperiences, setAcademicExperiences] = useState<AcademicExperience[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<AcademicExperience | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const fetchAcademicExperienceById = async (id: number) => {
        try {
            const response = await axios.get<AcademicExperience>(
                `http://localhost:8080/academicExperience/getAcademicExperienceById/${id}`
            );
            setSelectedExperience(response.data);
            setIsEditing(true);
            handleOpen();
        } catch (error) {
            console.error("Erro ao buscar experiência acadêmica:", error);
        }
    };

    const handleUpdateAcademicExperience = async (updatedExperience: AcademicExperience) => {
        try {
            await axios.put(
                `http://localhost:8080/academicExperience/update/${updatedExperience.id}`,
                updatedExperience
            );
            console.log("Atualizado com sucesso");
            setIsEditing(false);

            setAcademicExperiences((prev) =>
                prev?.map((exp) =>
                    exp.id === updatedExperience.id ? updatedExperience : exp
                ) || []
            );
        } catch (error) {
            console.error("Erro ao atualizar experiência acadêmica:", error);
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
                            borderRadius: "4px",
                            padding: "16px",
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

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginTop: '20px' }}>
                            <DeleteOutlineIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteAcademicExperience(experience.id)} />

                            <Box onClick={() => fetchAcademicExperienceById(experience.id)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#87aa68'}}>Editar Informações</Typography>
                                <EditIcon sx={{ color: '#87aa68' }}/>
                            </Box>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography>Nenhuma experiência acadêmica encontrada.</Typography>
            )}

            {isEditing && selectedExperience && (
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogContent>
                        <EditAcademicExperienceForm
                            experience={selectedExperience}
                            onChange={(updatedExperience) => setSelectedExperience(updatedExperience)}
                            onSubmit={() => handleUpdateAcademicExperience(selectedExperience)}
                            onCancel={() => setIsEditing(false)}
                        />
                    </DialogContent>
                </Dialog>

            )}
        </Box>
    );
};

export default AcademicExperienceList;
