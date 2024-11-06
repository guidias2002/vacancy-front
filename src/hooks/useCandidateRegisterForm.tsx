import { useState } from 'react';
import { ValidationErrors, validateCandidateData } from '../validations/RegisterFormValidation';
import { CandidateData } from '../types/CandidateData';
import axios from 'axios';

const API_URL = 'http://localhost:8080/candidate';

export const useCandidateRegisterForm = () => {
  const [formData, setFormData] = useState<CandidateData>({
    name: '',
    login: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = await validateCandidateData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await axios.post(API_URL, formData);
        setFormData({
          name: '',
          login: '',
          password: '',
          email: '',
        });
        setErrors({});
        setSuccessMessageOpen(true);
      } catch (error) {
        console.error("Erro ao cadastrar usuário", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessageOpen(false);
  };

  return {
    formData,
    errors,
    loading,
    successMessageOpen,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  };
};
