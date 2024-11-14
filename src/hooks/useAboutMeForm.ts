import { useState, useEffect } from 'react';
import axios from 'axios';

import CandidateAboutMeData from '../types/CandidateAboutMeData';

const getStorageKey = (id: string | null) => `candidate_${id}`;

const useAboutMeForm = (candidateId: string | null) => {
  const [candidate, setCandidate] = useState<CandidateAboutMeData>({
    fullName: '',
    location: '',
    cellphoneNumber: '',
    linkedin: '',
  });

  const [errors, setErrors] = useState<Partial<CandidateAboutMeData>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  useEffect(() => {
    if (!candidateId) return;

    const storageKey = getStorageKey(candidateId);

    const storedCandidate = localStorage.getItem(storageKey);
    if (storedCandidate) {
      setCandidate(JSON.parse(storedCandidate));
      setIsSaved(true);
    } else {
      fetchCandidateData();
    }

    return () => {
      localStorage.removeItem(storageKey);
    };
  }, [candidateId]);


  const fetchCandidateData = async () => {
    if (!candidateId) return;
    try {
      const response = await axios.get(`http://localhost:8080/aboutMe/${candidateId}`);
      const data = response.data;
      setCandidate({
        fullName: data.fullName,
        location: data.location,
        cellphoneNumber: data.cellphoneNumber,
        linkedin: data.linkedin,
      });
      setIsSaved(true);
    } catch (error) {
      console.error('Erro ao buscar dados do candidato:', error);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CandidateAboutMeData> = {};
    if (!candidate.fullName) newErrors.fullName = 'Campo obrigatório';
    if (!candidate.location) newErrors.location = 'Campo obrigatório';
    if (!candidate.cellphoneNumber) newErrors.cellphoneNumber = 'Campo obrigatório';
    if (!candidate.linkedin) newErrors.linkedin = 'Campo obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof CandidateAboutMeData, value: string) => {
    setCandidate((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const storageKey = getStorageKey(candidateId);

      if (isSaved) {
        await axios.put(`http://localhost:8080/aboutMe/update/${candidateId}`, candidate);
      } else {
        await axios.post(`http://localhost:8080/aboutMe/${candidateId}`, candidate);
        setIsSaved(true);
      }
      localStorage.setItem(storageKey, JSON.stringify(candidate));

      setSuccessMessageOpen(true);
    } catch (error) {
      console.error('Erro ao salvar ou atualizar candidato:', error);
    }
  };


  return {
    candidate,
    errors,
    isSaved,
    handleChange,
    handleSubmit,
    successMessageOpen,
    setSuccessMessageOpen
};
};

export default useAboutMeForm;
