import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useAcademyExperienceForm } from "../../../hooks/useAcademicExperienceForm";

interface AcademicExperienceFormPopupProps {
    onClose: () => void;
}

const AcademicExperienceFormPopup: React.FC<AcademicExperienceFormPopupProps> = ({ onClose }) => {
    const candidateId = localStorage.getItem("candidateId");

    const {
        handleSubmit,
        handleChange,
        academicExperience,
    } = useAcademyExperienceForm(candidateId);

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Curso"
                name="course"
                value={academicExperience?.course}
                onChange={(e) => handleChange('course', e.target.value)}
            />
            <TextField
                label="Instituição de ensino"
                name="institution"
                value={academicExperience?.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
            />

            <Box sx={{ display: 'flex', gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={courseLevels}
                    value={academicExperience?.level}
                    onChange={(_, value) => handleChange("level", value || "")}
                    renderInput={(params) => <TextField {...params} label="Nível" />}
                />

                <Autocomplete
                    fullWidth
                    options={status}
                    value={academicExperience?.status}
                    onChange={(_, value) => handleChange("status", value || "")}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={months}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("monthStart", value ? value.label : "")}
                    renderInput={(params) => <TextField {...params} label="Mês de início" />}
                />
                <Autocomplete
                    fullWidth
                    options={years}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("yearStart", value ? value.value : 0)}
                    renderInput={(params) => <TextField {...params} label="Ano de início" />}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4 }}>
                <Autocomplete
                    fullWidth
                    options={months}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("monthEnd", value ? value.label : "")}
                    renderInput={(params) => <TextField {...params} label="Mês de término" />}
                />
                <Autocomplete
                    fullWidth
                    options={years}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => handleChange("yearEnd", value ? value.value : 0)}
                    renderInput={(params) => <TextField {...params} label="Ano de término" />}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    sx={{ bgcolor: '#87aa68', color: 'white' }}
                    variant="contained"
                    onClick={() => {
                        handleSubmit();
                        onClose();
                    }}
                >
                    Salvar
                </Button>
                <Button
                    variant="outlined"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
};

export default AcademicExperienceFormPopup;
