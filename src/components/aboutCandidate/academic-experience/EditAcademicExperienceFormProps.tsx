import { Box, Typography, TextField, Button, Autocomplete } from '@mui/material';
import AcademicExperience from '../../../types/AcademicExperience';

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
    return (
        <Box
            sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
                marginBottom: "20px",
            }}
        >
            <Typography variant="h6">Editar Experiência Acadêmica</Typography>

            <TextField
                label="Curso"
                value={experience.course}
                onChange={(e) =>
                    onChange({
                        ...experience,
                        course: e.target.value,
                    })
                }
                fullWidth
                margin="normal"
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
                fullWidth
                margin="normal"
            />

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
                    renderInput={(params) => <TextField {...params} label="Nível" />}
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
                    renderInput={(params) => <TextField {...params} label="Status" />}
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
                    renderInput={(params) => <TextField {...params} label="Mês de início" />}
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
                    renderInput={(params) => <TextField {...params} label="Ano de início" />}
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
                            monthEnd: value ? value.label : "", // Salva o nome do mês
                        })
                    }
                    renderInput={(params) => <TextField {...params} label="Mês de término" />}
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
                    renderInput={(params) => <TextField {...params} label="Ano de término" />}
                />
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                sx={{ marginRight: 1 }}
            >
                Salvar Alterações
            </Button>

            <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancelar
            </Button>
        </Box>
    );
};


export default EditAcademicExperienceForm;
