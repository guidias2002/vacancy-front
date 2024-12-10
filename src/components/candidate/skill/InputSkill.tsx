import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";


const InputSkill: React.FC = () => {

    const [skill, setSkill] = useState<string>("");
    const candidateId = localStorage.getItem("userId");
    const [errors, setErrors] = useState({ skill: '' });

    const handleSubmit = async () => {
        const validationErrors = {
            skill: skill ? '' : 'Campo obrigatório',
        };

        if (!skill) {
            setErrors(validationErrors);
            return;
        }

        const existsError = await existsBySkill();
        if (existsError) {
            setErrors({ skill: existsError });
            return;
        }

        try {
            await axios.post(`http://localhost:8080/skill/candidateId/${candidateId}`, {
                skill,
            });

            setSkill(""); // 
            window.location.reload(); 
        } catch (error) {
            console.error("Erro ao salvar habilidade.", error);
        }
    };

    const existsBySkill = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/skill/existsBySkill/${skill}`);

            if (response.data) {
                return 'Habilidade já existe.';
            }
            return ''; 
        } catch (error) {
            console.error("Erro ao verificar habilidade.", error);
            return 'Erro ao verificar habilidade.';
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSkill(value);

        if (value) {
            setErrors((prevErrors) => ({ ...prevErrors, skill: '' }));
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2, width: '100%', alignItems: "flex-start" }}>
            <TextField
                label="Habilidade"
                variant="outlined"
                value={skill}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.skill}
                helperText={errors.skill}
                size="small"
            />
            <Button sx={{ bgcolor: "#87aa68", color: "white", width: '20%' }} variant="contained" color="primary" onClick={handleSubmit}>
                Salvar
            </Button>
        </Box>
    );
}

export default InputSkill;