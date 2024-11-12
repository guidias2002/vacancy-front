import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProfessionalExperienceData {
id: string;
  enterprise: string;
  position: string;
  monthStart: string;
  yearStart: string;
  monthEnd: string | null;
  yearEnd: string | null;
  isCurrentJob: boolean;
  description: string;
}

interface Errors {
  [key: string]: string;
}

const useProfessionalExperienceForm = (candidateId: string | null) => {
  const [experiences, setExperiences] = useState<ProfessionalExperienceData[]>([]);
  const [errors, setErrors] = useState<Errors[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const fetchProfessionalExperiences = async () => {
    if (!candidateId) return;
    try {
      const response = await axios.get(`http://localhost:8080/professionalExperience/getAllByCandidateId/${candidateId}`);
      setExperiences(response.data); 
    } catch (error) {
      console.error("Erro ao buscar experiências profissionais:", error);
      alert("Erro ao buscar experiências profissionais.");
    }
  };

  useEffect(() => {
    fetchProfessionalExperiences();
  }, [candidateId]);

  const handleChange = (index: number, name: keyof ProfessionalExperienceData, value: string | boolean) => {
    setExperiences((prev) => {
      const updatedExperiences = [...prev];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [name]: value,
      };
      return updatedExperiences;
    });
  };

  const handleCheckboxChange = (index: number) => {
    setExperiences((prev) => {
      const updatedExperiences = [...prev];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        isCurrentJob: !updatedExperiences[index].isCurrentJob,
        monthEnd: !updatedExperiences[index].isCurrentJob ? null : updatedExperiences[index].monthEnd,
        yearEnd: !updatedExperiences[index].isCurrentJob ? null : updatedExperiences[index].yearEnd,
      };
      return updatedExperiences;
    });
  };

  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: '',
        enterprise: '',
        position: '',
        monthStart: '',
        yearStart: '',
        monthEnd: '',
        yearEnd: '',
        isCurrentJob: false,
        description: '',
      },
    ]);
  };

  const handleRemoveExperience = async (index: number) => {
    
    const experienceId = experiences[index]?.id;

  if (!experienceId) {
    alert("ID da experiência não encontrado.");
    return;
  }

  try {
    await axios.delete(`http://localhost:8080/professionalExperience/delete/${experienceId}`);
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  } catch (error) {
    console.error("Erro ao remover a experiência:", error);
  }
  };

  const validate = () => {
    const newErrors = experiences.map((experience) => {
      const expErrors: Errors = {};
      if (!experience.enterprise) expErrors.enterprise = 'Campo obrigatório';
      if (!experience.description) expErrors.description = 'Campo obrigatório';
      if (!experience.position) expErrors.position = 'Campo obrigatório';
      if (!experience.monthStart) expErrors.monthStart = 'Campo obrigatório';
      if (!experience.yearStart) expErrors.yearStart = 'Campo obrigatório';
      if (!experience.isCurrentJob && !experience.monthEnd) expErrors.monthEnd = 'Campo obrigatório';
      if (!experience.isCurrentJob && !experience.yearEnd) expErrors.yearEnd = 'Campo obrigatório';
      return expErrors;
    });
    setErrors(newErrors);
    return newErrors.every((error) => Object.keys(error).length === 0);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post(`http://localhost:8080/professionalExperience/candidateId/${candidateId}`, experiences);
      setIsSaved(true);

      fetchProfessionalExperiences();
    } catch (error) {
      console.error('Erro ao cadastrar experiências profissionais:', error);
      alert('Erro ao cadastrar experiências profissionais.');
    }
  };

  return {
    experiences,
    errors,
    isSaved,
    handleChange,
    handleCheckboxChange,
    handleAddExperience,
    handleRemoveExperience,
    handleSubmit,
  };
};

export default useProfessionalExperienceForm;
