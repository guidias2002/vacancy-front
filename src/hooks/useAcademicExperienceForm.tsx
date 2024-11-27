import axios from "axios"
import { useState } from "react";
import AcademicExperience from "../types/AcademicExperience";

export const useAcademyExperienceForm = (candidateId: string | null) => {


    const [academicExperience, setAcademicExperience] = useState<AcademicExperience>({
        id: 0,
        course: "",
        institution: "",
        level: "",
        status: "",
        monthStart: "",
        yearStart: 0,
        monthEnd: "",
        yearEnd: 0,
    });

    const handleSubmit = async () => {

        try {
            await axios.post(`http://localhost:8080/academicExperience/candidateId/${candidateId}`, academicExperience);
            console.log("salvo com sucesso")
            window.location.reload();
        } catch (error) {
            console.log("erro ao salvar informações", error)
        }
    }

    const handleChange = (field: keyof AcademicExperience, value: any) => {
        setAcademicExperience((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return {
        handleSubmit,
        handleChange,
        academicExperience
    }
}