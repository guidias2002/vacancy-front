import { Box, TextField, Button, Autocomplete } from '@mui/material';
import AcademicExperience from '../../../types/AcademicExperience';
import { validateAcademicExperience } from "../../../validations/AcademicExperienceFormValidation";
import { useState } from 'react';

interface EditAcademicExperienceFormProps {
    experience: AcademicExperience;
    onChange: (updatedExperience: AcademicExperience) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

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
    "Técnico"
];
const status = ["Completo", "Cursando", "Incompleto"];

const EditAcademicExperienceForm: React.FC<EditAcademicExperienceFormProps> = ({
    experience,
    onChange,
    onSubmit,
    onCancel,
}) => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSave = () => {
        const validationErrors = validateAcademicExperience(
            experience,
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

        setErrors({});
        onSubmit();
    };


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: "column" }}>
                <TextField
                    label="Curso"
                    value={experience.course}
                    onChange={(e) =>
                        onChange({
                            ...experience,
                            course: e.target.value,
                        })
                    }
                    error={!!errors.course}
                    helperText={errors.course}
                    fullWidth
                    margin="normal"
                    size="small"
                />

                <TextField
                    label="Instituição"
                    value={experience.institution}
                    onChange={(e) =>
                        onChange({
                            ...experience,
                            institution: e.target.value,
                        })
                    }
                    error={!!errors.institution}
                    helperText={errors.institution}
                    fullWidth
                    margin="normal"
                    size="small"
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={courseLevels}
                    value={experience.level || ""}
                    onChange={(_, value) =>
                        onChange({
                            ...experience,
                            level: value || "",
                        })
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Nível"
                            error={!!errors.level}
                            helperText={errors.level}
                            size="small"
                        />}
                />

                <Autocomplete
                    fullWidth
                    options={status}
                    value={experience.status || ""}
                    onChange={(_, value) =>
                        onChange({
                            ...experience,
                            status: value || "",
                        })
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Status"
                            error={!!errors.status}
                            helperText={errors.status}
                            size="small"
                        />}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={months}
                    getOptionLabel={(option) => option.label}
                    value={
                        months.find((month) => month.label === experience.monthStart) || null
                    }
                    onChange={(_, value) =>
                        onChange({
                            ...experience,
                            monthStart: value ? value.label : "", // Salva o nome do mês
                        })
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Mês de início"
                            error={!!errors.monthStart}
                            helperText={errors.monthStart}
                        />}
                />

                <Autocomplete
                    fullWidth
                    options={years}
                    getOptionLabel={(option) => option.label}
                    value={
                        years.find((year) => year.value === experience.yearStart) || null
                    }
                    onChange={(_, value) =>
                        onChange({
                            ...experience,
                            yearStart: value ? value.value : 0, // Salva o ano
                        })
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Ano de início"
                            error={!!errors.yearStart}
                            helperText={errors.yearStart}
                            size="small"
                        />}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={months}
                    getOptionLabel={(option) => option.label}
                    value={
                        months.find((month) => month.label === experience.monthEnd) || null
                    }
                    onChange={(_, value) =>
                        onChange({
                            ...experience,
                            monthEnd: value ? value.label : "",
                        })
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Mês de término"
                            error={!!errors.monthEnd}
                            helperText={errors.monthEnd}
                            size="small"
                        />}
                />

                <Autocomplete
                    fullWidth
                    options={years}
                    getOptionLabel={(option) => option.label}
                    value={
                        years.find((year) => year.value === experience.yearEnd) || null
                    }
                    onChange={(_, value) =>
                        onChange({
                            ...experience,
                            yearEnd: value ? value.value : 0,
                        })
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Ano de término"
                            error={!!errors.yearEnd}
                            helperText={errors.yearEnd}
                            size="small"
                        />}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    sx={{ bgcolor: "#87aa68", color: "white" }} variant="contained"
                    onClick={handleSave}
                >
                    Salvar Alterações
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
};


export default EditAcademicExperienceForm;
