import axios from "axios";
import { useEffect, useState } from "react";
import { ProfessionalExperience } from "../../../types/ProfessionalExperience";


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
                `http://localhost:8080/academicExperience/getAcademicExperienceById/${id}`
            );
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
        <>

        </>
    );
}

export default ProfessionalExperienceList;