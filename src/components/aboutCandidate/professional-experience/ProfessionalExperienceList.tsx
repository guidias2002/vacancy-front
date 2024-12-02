import axios from "axios";
import { useEffect, useState } from "react";
import { ProfessionalExperience } from "../../../types/ProfessionalExperience";
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditProfessionalExperienceForm from "./EditProfessionalExperienceFormProps";


const ProfessionalExperienceList: React.FC = () => {

    const candidateId = localStorage.getItem("candidateId");
    const [professionalExperiences, setProfessionalExperiences] = useState<ProfessionalExperience[] | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<ProfessionalExperience | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (!candidateId) {
            setError("ID do candidato não encontrado.");

            setLoading(false);
            return;
        }

        axios.get<ProfessionalExperience[]>(`http://localhost:8080/professionalExperience/getAllByCandidateId/${candidateId}`)
            .then((response) => {
                setProfessionalExperiences(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Erro ao buscar as experiências profissionais.");
                setLoading(false);
            });
    }, [candidateId]);

    const handleDeleteAcademicExperience = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/professionalExperience/delete/${id}`);
            console.log("Excluído com sucesso");

            setProfessionalExperiences((prev) => {
                return prev ? prev.filter((exp) => exp.id !== id) : null;
            });
        } catch (error) {
            console.error("Erro ao excluir experiência:", error);
        }
    };

    const getProfessionalExperienceById = async (id: number) => {
        try {
            const response = await axios.get<ProfessionalExperience>(
                `http://localhost:8080/professionalExperience/professionalExperienceId/${id}`
            );
            console.log(response.data)
            setSelectedExperience(response.data);
            setIsEditing(true);
            handleOpen();
        } catch (error) {
            console.error("Erro ao buscar experiência acadêmica:", error);
        }
    };

    const handleUpdateProfessionalExperience = async (updatedExperience: ProfessionalExperience) => {
        try {
            await axios.put(
                `http://localhost:8080/professionalExperience/update/${updatedExperience.id}`,
                updatedExperience
            );
            console.log("Atualizado com sucesso");
            setIsEditing(false);

            setProfessionalExperiences((prev) =>
                prev?.map((exp) =>
                    exp.id === updatedExperience.id ? updatedExperience : exp
                ) || []
            );
        } catch (error) {
            console.error("Erro ao atualizar experiência profissional:", error);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {professionalExperiences && professionalExperiences.length > 0 ? (
                professionalExperiences.map((experience, index) => (

                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "16px",
                            gap: '14px'
                        }}
                    >

                        <Typography sx={{ color: '#87aa68', fontWeight: 'bold' }}>Expriência profissional {index + 1}</Typography>

                        <Divider />

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography fontWeight={'bold'}>{experience.position}</Typography>
                            <Typography>{experience.enterprise}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Início</Typography>
                                <Typography>
                                    {experience.monthStart} {experience.yearStart}
                                </Typography>
                            </Box>

                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Até</Typography>

                                {experience.isCurrentJob ?
                                    <Typography>
                                        Trabalho atual
                                    </Typography> :
                                    <Typography>
                                        {experience.monthEnd} {experience.yearEnd}
                                    </Typography>
                                }

                            </Box>
                        </Box>


                        {experience.isCurrentJob}

                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography color='#636362'>Descrição</Typography>
                                <Typography>
                                    {experience.description}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginTop: '20px' }}>
                            <DeleteOutlineIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteAcademicExperience(experience.id)} />

                            <Box onClick={() => getProfessionalExperienceById(experience.id)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                <Typography sx={{ fontWeight: 'bold', color: '#87aa68' }}>Editar Informações</Typography>
                                <EditIcon sx={{ color: '#87aa68' }} />
                            </Box>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography>Nenhuma experiência profissional encontrada.</Typography>
            )}

            {isEditing && selectedExperience && (
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>Editar Experiência Profissional</DialogTitle>
                    <DialogContent>
                        <EditProfessionalExperienceForm
                            experience={selectedExperience}
                            onChange={(updatedExperience) => setSelectedExperience(updatedExperience)}
                            onSubmit={() => handleUpdateProfessionalExperience(selectedExperience)}
                            onCancel={() => setIsEditing(false)}
                        />
                    </DialogContent>
                </Dialog>

            )}
        </Box>
    );
}

export default ProfessionalExperienceList;