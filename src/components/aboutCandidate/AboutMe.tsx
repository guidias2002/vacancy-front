import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import useAboutMeForm from '../../hooks/useAboutMeForm';
import FormAccordion from '../FormAccordion';
import LocationSelect from '../LocationSelect';
import candidateAboutMeData from '../../types/CandidateAboutMeData';
import InputMask from 'react-input-mask';

const AboutMeForm: React.FC = () => {
  const candidateId = localStorage.getItem("candidateId");
  const {
    candidate,
    errors,
    isSaved,
    handleChange,
    handleSubmit,
  } = useAboutMeForm(candidateId);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cellphoneNumber') {
      const maskedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      handleChange(name as keyof candidateAboutMeData, maskedValue);
    } else {
      handleChange(name as keyof candidateAboutMeData, value);
    }
  };

  return (
    <FormAccordion title="Sobre Mim">
      <Box
        component="form"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: '0 auto' }}
      >
        <TextField
          label="Nome Completo"
          name="fullName"
          value={candidate.fullName}
          onChange={onInputChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <LocationSelect
          value={candidate.location}
          onChange={(newValue) => handleChange('location', newValue)}
          error={!!errors.location}
          helperText={errors.location}
        />
        <InputMask
          mask="(99) 99999-9999"
          value={candidate.cellphoneNumber}
          onChange={onInputChange}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              label="Número de Celular"
              name="cellphoneNumber"
              error={!!errors.cellphoneNumber}
              helperText={errors.cellphoneNumber}
            />
          )}
        </InputMask>
        <TextField
          label="LinkedIn"
          name="linkedin"
          value={candidate.linkedin}
          onChange={onInputChange}
          error={!!errors.linkedin}
          helperText={errors.linkedin}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ width: '200px' }} type="submit" variant="contained" color="primary">
            {isSaved ? 'Atualizar' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </FormAccordion>
  );
};

export default AboutMeForm;
