import axios from "axios"
import { useState } from "react";

export const useAcademyExperienceForm = (candidateId: string | null) => {

    interface AcademicExperienceData {
        id: string;
        course: string;
        institution: string;
        level: string;
        status: string;
        monthStart: string;
        yearStart: number;
        monthEnd: string;
        yearEnd: number;
    }

    const [academicExperience, setAcademicExperience] = useState<AcademicExperienceData>({
        id: "",
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

    const handleChange = (field: keyof AcademicExperienceData, value: any) => {
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