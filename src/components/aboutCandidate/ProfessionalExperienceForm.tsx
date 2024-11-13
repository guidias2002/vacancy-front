import React from 'react';
import { Box, Button, TextField, Checkbox, FormControlLabel, IconButton, Divider, Typography, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useProfessionalExperienceForm from '../../hooks/useProfessionalExperienceForm';
import FormAccordion from '../FormAccordion';
import AddIcon from '@mui/icons-material/Add';

const ProfessionalExperienceForm: React.FC = () => {
    const candidateId = localStorage.getItem("candidateId");

    const months = [
        { label: "Janeiro", value: 1 },
        { label: "Fevereiro", value: 2 },
        { label: "Março", value: 3 },
        { label: "Abril", value: 4 },
        { label: "Maio", value: 5 },
        { label: "Junho", value: 6 },
        { label: "Julho", value: 7 },
        { label: "Agosto", value: 8 },
        { label: "Setembro", value: 9 },
        { label: "Outubro", value: 10 },
        { label: "Novembro", value: 11 },
        { label: "Dezembro", value: 12 },
    ];

    const years = Array.from({ length: 2024 - 1970 + 1 }, (_, i) => ({
        label: `${1970 + i}`,
        value: 1970 + i,
    })).reverse();

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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                            {/* Mês de Início */}
                            <Autocomplete
                                fullWidth
                                options={months}
                                getOptionLabel={(option) => option.label}
                                value={months.find((m) => m.value === Number(experience.monthStart)) || null}
                                onChange={(e, newValue) => handleChange(index, 'monthStart', String(newValue?.value || ''))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Mês de Início"
                                        error={!!errors[index]?.monthStart}
                                        helperText={errors[index]?.monthStart}
                                    />
                                )}
                            />

                            {/* Ano de Início */}
                            <Autocomplete
                                fullWidth
                                options={years}
                                getOptionLabel={(option) => option.label}
                                value={years.find((y) => y.value === Number(experience.yearStart)) || null}
                                onChange={(e, newValue) => handleChange(index, 'yearStart', String(newValue?.value || ''))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ano de Início"
                                        error={!!errors[index]?.yearStart}
                                        helperText={errors[index]?.yearStart}
                                    />
                                )}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* Mês de Término */}
                                <Autocomplete
                                    fullWidth
                                    options={months}
                                    getOptionLabel={(option) => option.label}
                                    value={experience.isCurrentJob ? null : months.find((m) => m.value === Number(experience.monthEnd)) || null}
                                    onChange={(e, newValue) => {
                                        if (!experience.isCurrentJob) {
                                            handleChange(index, 'monthEnd', String(newValue?.value || ''));
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Mês de Término"
                                            error={!!errors[index]?.monthEnd}
                                            helperText={errors[index]?.monthEnd}
                                            disabled={experience.isCurrentJob}
                                        />
                                    )}
                                />

                                {/* Ano de Término */}
                                <Autocomplete
                                    fullWidth
                                    options={years}
                                    getOptionLabel={(option) => option.label}
                                    value={experience.isCurrentJob ? null : years.find((y) => y.value === Number(experience.yearEnd)) || null}
                                    onChange={(e, newValue) => {
                                        if (!experience.isCurrentJob) {
                                            handleChange(index, 'yearEnd', String(newValue?.value || ''));
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Ano de Término"
                                            error={!!errors[index]?.yearEnd}
                                            helperText={errors[index]?.yearEnd}
                                            disabled={experience.isCurrentJob}
                                        />
                                    )}
                                />
                            </Box>

                            {/* Checkbox "Trabalho Atual" */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={experience.isCurrentJob}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            handleCheckboxChange(index, isChecked);

                                            // Limpa os campos de término se o checkbox estiver marcado
                                            if (isChecked) {
                                                handleChange(index, 'monthEnd', '');
                                                handleChange(index, 'yearEnd', '');
                                            }
                                        }}
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
            ))
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button
                    sx={{
                        color: '#87aa68',
                        borderColor: 'transparent',
                        textTransform: 'none',// Remover transformação de texto
                        '&:hover': {
                          backgroundColor: 'transparent', // Remover o fundo do hover
                          borderColor: 'transparent', // Remover a borda do hover
                        },
                    }}
                    startIcon={<AddIcon />} 
                    onClick={handleAddExperience}
                >
                    Adicionar Experiência
                </Button>

                <Button
                    sx={{
                        bgcolor: '#87aa68',
                        color: 'white', 
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Salvar Experiências
                </Button>
            </Box>

        </FormAccordion >
    );
};

export default ProfessionalExperienceForm;
