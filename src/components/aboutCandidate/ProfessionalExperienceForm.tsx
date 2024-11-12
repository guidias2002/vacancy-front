import React from 'react';
import { Box, Button, TextField, Checkbox, FormControlLabel, IconButton, Divider, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useProfessionalExperienceForm from '../../hooks/useProfessionalExperienceForm';
import FormAccordion from '../FormAccordion';

const ProfessionalExperienceForm: React.FC = () => {
    const candidateId = localStorage.getItem("candidateId");

    const {
        experiences,
        errors,
        handleChange,
        handleCheckboxChange,
        handleAddExperience,
        handleRemoveExperience,
        handleSubmit,
    } = useProfessionalExperienceForm(candidateId);

    return (
        <FormAccordion title='Experiência profissional'>
            {experiences.map((experience, index) => (

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ margin: '5px 0', fontSize: '1rem', fontWeight: 'bold' }}>Experiência profissional {index + 1}</Typography>
                    <TextField
                        label="Empresa"
                        name="enterprise"
                        value={experience.enterprise}
                        onChange={(e) => handleChange(index, 'enterprise', e.target.value)}
                        error={!!errors[index]?.enterprise}
                        helperText={errors[index]?.enterprise}
                    />
                    <TextField
                        label="Cargo"
                        name="position"
                        value={experience.position}
                        onChange={(e) => handleChange(index, 'position', e.target.value)}
                        error={!!errors[index]?.position}
                        helperText={errors[index]?.position}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Mês de Início"
                                name="monthStart"
                                value={experience.monthStart}
                                onChange={(e) => handleChange(index, 'monthStart', e.target.value)}
                                error={!!errors[index]?.monthStart}
                                helperText={errors[index]?.monthStart}
                            />
                            <TextField
                                label="Ano de Início"
                                name="yearStart"
                                value={experience.yearStart}
                                onChange={(e) => handleChange(index, 'yearStart', e.target.value)}
                                error={!!errors[index]?.yearStart}
                                helperText={errors[index]?.yearStart}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label="Mês de Término"
                                    name="monthEnd"
                                    value={experience.monthEnd}
                                    onChange={(e) => handleChange(index, 'monthEnd', e.target.value)}
                                    error={!!errors[index]?.monthEnd}
                                    helperText={errors[index]?.monthEnd}
                                    disabled={experience.isCurrentJob}
                                />
                                <TextField
                                    label="Ano de Término"
                                    name="yearEnd"
                                    value={experience.yearEnd}
                                    onChange={(e) => handleChange(index, 'yearEnd', e.target.value)}
                                    error={!!errors[index]?.yearEnd}
                                    helperText={errors[index]?.yearEnd}
                                    disabled={experience.isCurrentJob}
                                />
                            </Box>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={experience.isCurrentJob}
                                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                    />
                                }
                                label="Trabalho Atual"
                            />
                        </Box>
                    </Box>

                    <TextField
                        label="Descrição"
                        name="description"
                        multiline
                        rows={4}
                        value={experience.description}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                        error={!!errors[index]?.description}
                        helperText={errors[index]?.description}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => handleRemoveExperience(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 4 }} />
                </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="outlined" onClick={handleAddExperience}>Adicionar Experiência</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Salvar Experiências</Button>
            </Box>

        </FormAccordion >
    );
};

export default ProfessionalExperienceForm;
