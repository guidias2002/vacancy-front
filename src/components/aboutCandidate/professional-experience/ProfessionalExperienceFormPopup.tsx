import { Autocomplete, Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import useProfessionalExperienceForm from "../../../hooks/useProfessionalExperienceForm";

interface ProfessionalExperienceFormPopupProps {
    onClose: () => void;
}

const ProfessionalExperienceFormPopup: React.FC<ProfessionalExperienceFormPopupProps> = ({ onClose }) => {
    const candidateId = localStorage.getItem("candidateId");

    const { handleSubmit, handleChange, professionalExperience, setProfessionalExperience } = useProfessionalExperienceForm(candidateId);

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


    const handleSave = () => {
        handleSubmit();
        onClose();
    };

    const handleCheckboxChange = (isChecked: boolean) => {
        setProfessionalExperience((prevExperience) => ({
            ...prevExperience,
            isCurrentJob: isChecked,
            monthEnd: isChecked ? null : prevExperience.monthEnd,
            yearEnd: isChecked ? null : prevExperience.yearEnd,
        }));
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
                    label="Position"
                    name="position"
                    value={professionalExperience?.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    //error={!!errors.course}
                    //helperText={errors.course}
                    fullWidth
                />

                <TextField
                    label="Enterprise"
                    name="enterprise"
                    value={professionalExperience?.enterprise}
                    onChange={(e) => handleChange("enterprise", e.target.value)}
                    //error={!!errors.institution}
                    //helperText={errors.institution}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <Autocomplete
                        fullWidth
                        options={months}
                        getOptionLabel={(option) => option.value}
                        value={months.find((m) => m.value === professionalExperience.monthStart) || null}
                        onChange={(e, newValue) => handleChange('monthStart', String(newValue?.value || ''))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Mês de Início"
                            //error={!!errors[index]?.monthStart}
                            //helperText={errors[index]?.monthStart}
                            />
                        )}
                    />

                    <Autocomplete
                        fullWidth
                        options={years}
                        getOptionLabel={(option) => option.label}
                        value={years.find((y) => y.value === Number(professionalExperience.yearStart)) || null}
                        onChange={(e, newValue) => handleChange('yearStart', String(newValue?.value || ''))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ano de Início"
                            //error={!!errors[index]?.yearStart}
                            //helperText={errors[index]?.yearStart}
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
                            value={professionalExperience.isCurrentJob ? null : months.find((m) => m.value === professionalExperience.monthEnd) || null}
                            onChange={(e, newValue) => {
                                if (!professionalExperience.isCurrentJob) {
                                    handleChange('monthEnd', String(newValue?.value || ''));
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Mês de Término"
                                //error={!!errors[index]?.monthEnd}
                                //helperText={errors[index]?.monthEnd}
                                //disabled={experience.isCurrentJob}
                                />
                            )}
                        />

                        {/* Ano de Término */}
                        <Autocomplete
                            fullWidth
                            options={years}
                            getOptionLabel={(option) => option.label}
                            value={professionalExperience.isCurrentJob ? null : years.find((y) => y.value === Number(professionalExperience.yearEnd)) || null}
                            onChange={(e, newValue) => {
                                if (!professionalExperience.isCurrentJob) {
                                    handleChange('yearEnd', String(newValue?.value || ''));
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Ano de Término"
                                //error={!!errors[index]?.yearEnd}
                                //helperText={errors[index]?.yearEnd}
                                //disabled={experience.isCurrentJob}
                                />
                            )}
                        />

                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={professionalExperience.isCurrentJob}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    handleCheckboxChange(isChecked);
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
                value={professionalExperience.description}
                onChange={(e) => handleChange('description', e.target.value)}
                fullWidth
            //error={!!errors[index]?.description}
            //helperText={errors[index]?.description}
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
                    onClick={onClose}
                >
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
}

export default ProfessionalExperienceFormPopup;