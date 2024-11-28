import { useState } from 'react';
import axios from 'axios';
import { ProfessionalExperience } from '../types/ProfessionalExperience';


const useProfessionalExperienceForm = (candidateId: string | null) => {
  const [professionalExperience, setProfessionalExperience] = useState<ProfessionalExperience>({
    id: 0,
    enterprise: "",
    position: "",
    monthStart: "",
    yearStart: 0,
    monthEnd: "",
    yearEnd: 0,
    isCurrentJob: false,
    description: "",
  });


  const handleSubmit = async () => {

    try {
      await axios.post(`http://localhost:8080/professionalExperience/candidateId/${candidateId}`, professionalExperience);
      console.log("salvo com sucesso")
      window.location.reload();
    } catch (error) {
      console.log("erro ao salvar informações", error)
    }
  }

  const handleChange = (field: keyof ProfessionalExperience, value: any) => {
    setProfessionalExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  

  return {
    handleSubmit,
    handleChange,
    professionalExperience,
    setProfessionalExperience
  }


};

export default useProfessionalExperienceForm;
