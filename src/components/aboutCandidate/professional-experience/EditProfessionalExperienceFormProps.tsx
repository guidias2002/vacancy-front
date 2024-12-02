import { useState } from "react";
import { ProfessionalExperience } from "../../../types/ProfessionalExperience";
import { validateProfessionalExperience } from "../../../validations/ProfessionalExperienceFormValidation";
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

interface EditProfessionalExperienceFormProps {
    experience: ProfessionalExperience;
    onChange: (updatedExperience: ProfessionalExperience) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const months = [
    { value: "Janeiro" },
    { value: "Fevereiro" },
    { value: "Março" },
    { value: "Abril" },
    { value: "Maio" },
    { value: "Junho" },
    { value: "Julho" },
    { value: "Agosto" },
    { value: "Setembro" },
    { value: "Outubro" },
    { value: "Novembro" },
    { value: "Dezembro" },
];

const years = Array.from({ length: 2024 - 1970 + 1 }, (_, i) => ({
    label: `${1970 + i}`,
    value: 1970 + i,
})).reverse();

const EditProfessionalExperienceForm: React.FC<EditProfessionalExperienceFormProps> = ({
    experience,
    onChange,
    onSubmit,
    onCancel,
}) => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSave = () => {
        const validationErrors = validateProfessionalExperience(
            experience,
            months
        );

        if (validationErrors.length > 0) {
            const errorMap: Record<string, string> = {};
            validationErrors.forEach((error) => {
                errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
            return;
        }

        setErrors({});
        onSubmit();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: '10px 0'
            }}
        >

            <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Cargo"
                    name="position"
                    value={experience?.position}
                    onChange={(e) =>
                        onChange({
                            ...experience,
                            position: e.target.value,
                        })
                    }
                    error={!!errors.position}
                    helperText={errors.position}
                    fullWidth
                />

                <TextField
                    label="Empresa"
                    name="enterprise"
                    value={experience?.enterprise}
                    onChange={(e) =>
                        onChange({
                            ...experience,
                            enterprise: e.target.value,
                        })
                    }
                    error={!!errors.enterprise}
                    helperText={errors.enterprise}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <Autocomplete
                        fullWidth
                        options={months}
                        getOptionLabel={(option) => option.value}
                        value={months.find((m) => m.value === experience.monthStart) || null}
                        onChange={(_, value) =>
                            onChange({
                                ...experience,
                                monthStart: value ? value.value : "",
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Mês de Início"
                                error={!!errors.monthStart}
                                helperText={errors.monthStart}
                            />
                        )}
                    />

                    <Autocomplete
                        fullWidth
                        options={years}
                        getOptionLabel={(option) => option.label}
                        value={years.find((y) => y.value === Number(experience.yearStart)) || null}
                        onChange={(_, value) =>
                            onChange({
                                ...experience,
                                yearStart: value ? value.value : 0,
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ano de Início"
                                error={!!errors.yearStart}
                                helperText={errors.yearStart}
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
                            getOptionLabel={(option) => option.value}
                            value={experience.isCurrentJob ? null : months.find((m) => m.value === experience.monthEnd) || null}
                            onChange={(_, value) =>
                                onChange({
                                    ...experience,
                                    monthEnd: value ? value.value : "",
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Mês de Término"
                                    error={!!errors.monthEnd}
                                    helperText={errors.monthEnd}
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
                            onChange={(_, value) =>
                                onChange({
                                    ...experience,
                                    yearEnd: value ? value.value : 0,
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Ano de Término"
                                    error={!!errors.yearEnd}
                                    helperText={errors.yearEnd}
                                    disabled={experience.isCurrentJob}
                                />
                            )}
                        />


                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={experience.isCurrentJob}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    onChange({
                                        ...experience,
                                        isCurrentJob: isChecked,
                                        monthEnd: isChecked ? null : experience.monthEnd,
                                        yearEnd: isChecked ? null : experience.yearEnd,
                                    });
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
                onChange={(e) =>
                    onChange({
                        ...experience,
                        description: e.target.value,
                    })
                }
                fullWidth
                error={!!errors.description}
                helperText={errors.description}
            />


            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button sx={{ bgcolor: "#87aa68", color: "white" }} variant="contained" onClick={handleSave}>
                    Salvar
                </Button>

                <Button variant="outlined" sx={{
                    color: "#87aa68",
                    borderColor: '#87aa68',
                    "&:hover": {
                        backgroundColor: "transparent",
                        borderColor: "#87aa68",
                    }
                }}
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
            </Box>

        </Box>
    );
}

export default EditProfessionalExperienceForm;