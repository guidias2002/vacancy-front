// src/components/CandidateRegistrationForm.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import usePost from '../../hooks/usePost';
import { validateCandidateData, ValidationErrors } from '../../validations/RegisterFormValidation';

interface CandidateData {
  name: string;
  login: string;
  password: string;
  email: string;
}

const CandidateRegistrationForm: React.FC = () => {
  const { loading, postData } = usePost<CandidateData, any>('http://localhost:8080/candidate');
  
  const [formData, setFormData] = useState<CandidateData>({
    name: '',
    login: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateCandidateData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      postData({ ...formData });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cadastro de Candidato
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
          error={!!errors.login}
          helperText={errors.login}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </Box>
  );
};

export default CandidateRegistrationForm;
