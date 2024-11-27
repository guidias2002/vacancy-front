import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useAcademyExperienceForm } from "../../../hooks/useAcademicExperienceForm";
import { validateAcademicExperience } from "../../../validations/AcademicExperienceFormValidation";
import { useState } from "react";

interface AcademicExperienceFormPopupProps {
    onClose: () => void;
}

const AcademicExperienceFormPopup: React.FC<AcademicExperienceFormPopupProps> = ({ onClose }) => {
    const candidateId = localStorage.getItem("candidateId");

    const { handleSubmit, handleChange, academicExperience } = useAcademyExperienceForm(candidateId);

    const [errors, setErrors] = useState<Record<string, string>>({});

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

    const courseLevels = [
        "Bacharelado",
        "Doutorado",
        "Ensino Fundamental",
        "Ensino Médio",
        "Ensino Técnico",
        "Especialização",
        "Extensão",
        "Intercâmbio",
        "Licenciatura",
        "Mestrado",
        "Outro",
        "Pós-Graduação",
        "Tecnólogo",
        "Treinamento",
        "Técnico",
    ];
    const status = ["Completo", "Cursando", "Incompleto"];

    const handleSave = () => {
        const validationErrors = validateAcademicExperience(
            academicExperience,
            months,
            courseLevels,
            status
        );

        if (validationErrors.length > 0) {
            const errorMap: Record<string, string> = {};
            validationErrors.forEach((error) => {
                errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
            return;
        }

        // Se não houver erros, limpa os erros e envia os dados
        setErrors({});
        handleSubmit();
        onClose();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
                <TextField
                    label="Curso"
                    name="course"
                    value={academicExperience?.course}
                    onChange={(e) => handleChange("course", e.target.value)}
                    error={!!errors.course}
                    helperText={errors.course}
                    fullWidth
                />
            </Box>
            <Box>
                <TextField
                    label="Instituição de ensino"
                    name="institution"
                    value={academicExperience?.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    error={!!errors.institution}
                    helperText={errors.institution}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={courseLevels}
                    value={academicExperience?.level}
                    onChange={(_, value) => handleChange("level", value || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nível"
                            error={!!errors.level}
                            helperText={errors.level}
                        />
                    )}
                />

                <Autocomplete
                    fullWidth
                    options={status}
                    value={academicExperience?.status}
                    onChange={(_, value) => handleChange("status", value || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Status"
                            error={!!errors.status}
                            helperText={errors.status}
                        />
                    )}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={months}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("monthStart", value ? value.label : "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Mês de início"
                            error={!!errors.monthStart}
                            helperText={errors.monthStart}
                        />
                    )}
                />
                <Autocomplete
                    fullWidth
                    options={years}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("yearStart", value ? value.value : 0)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Ano de início"
                            error={!!errors.yearStart}
                            helperText={errors.yearStart}
                        />
                    )}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={months}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("monthEnd", value ? value.label : "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Mês de término"
                            error={!!errors.monthEnd}
                            helperText={errors.monthEnd}
                        />
                    )}
                />
                <Autocomplete
                    fullWidth
                    options={years}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("yearEnd", value ? value.value : 0)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Ano de término"
                            error={!!errors.yearEnd}
                            helperText={errors.yearEnd}
                        />
                    )}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button sx={{ bgcolor: "#87aa68", color: "white" }} variant="contained" onClick={handleSave}>
                    Salvar
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
};

export default AcademicExperienceFormPopup;