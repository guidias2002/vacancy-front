import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

interface Candidate {
  fullName: string;
  location: string;
  cellphoneNumber: string;
  linkedin: string;
}

const AboutMeForm: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate>({
    fullName: '',
    location: '',
    cellphoneNumber: '',
    linkedin: '',
  });
  
  const [isSaved, setIsSaved] = useState(false); // Controle para saber se o candidato já foi salvo
  const candidateId = localStorage.getItem("candidateId");

  // Função para gerar a chave do localStorage baseada no candidateId
  const getStorageKey = (id: string | null) => `candidate_${id}`;

  // Carregar os dados do localStorage ao carregar a página
  useEffect(() => {
    if (!candidateId) {
      return; // Não fazer nada se não houver candidateId
    }

    const storageKey = getStorageKey(candidateId);
    const storedCandidate = localStorage.getItem(storageKey);

    if (storedCandidate) {
      setCandidate(JSON.parse(storedCandidate)); // Preenche o formulário com os dados salvos
      setIsSaved(true); // Marca como salvo se houver dados
    } else {
      // Se não houver dados no localStorage, buscar do servidor
      const fetchCandidateData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/aboutMe/${candidateId}`);
          const data = response.data;
          setCandidate({
            fullName: data.fullName,
            location: data.location,
            cellphoneNumber: data.cellphoneNumber,
            linkedin: data.linkedin,
          });
          setIsSaved(true); // Marcar como salvo
        } catch (error) {
          console.error('Erro ao buscar dados do candidato:', error);
        }
      };
      fetchCandidateData();
    }
  }, [candidateId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storageKey = getStorageKey(candidateId);
      
      if (isSaved) {
        // Se já está salvo, faz a atualização
        const response = await axios.put(`http://localhost:8080/aboutMe/update/${candidateId}`, candidate);
        console.log('Candidato atualizado:', response.data);
        // Salva os dados atualizados no localStorage
        localStorage.setItem(storageKey, JSON.stringify(candidate));
      } else {
        // Caso contrário, faz o primeiro salvamento
        const response = await axios.post(`http://localhost:8080/aboutMe/${candidateId}`, candidate);
        console.log('Candidato salvo:', response.data);
        setIsSaved(true); // Após salvar, mudar para "Atualizar"
        // Salva os dados no localStorage após salvar
        localStorage.setItem(storageKey, JSON.stringify(candidate));
      }
    } catch (error) {
      console.error('Erro ao salvar ou atualizar candidato:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <TextField
        label="Nome Completo"
        name="fullName"
        value={candidate.fullName}
        onChange={handleChange}
      />
      <TextField
        label="Localização"
        name="location"
        value={candidate.location}
        onChange={handleChange}
      />
      <TextField
        label="Número de Celular"
        name="cellphoneNumber"
        value={candidate.cellphoneNumber}
        onChange={handleChange}
      />
      <TextField
        label="LinkedIn"
        name="linkedin"
        value={candidate.linkedin}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        {isSaved ? 'Atualizar Candidato' : 'Salvar Candidato'}
      </Button>
    </Box>
  );
};

export default AboutMeForm;
