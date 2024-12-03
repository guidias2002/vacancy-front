import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";


const InputSkill: React.FC = () => {

    const [skill, setSkill] = useState<string>("");
    const candidateId = localStorage.getItem("candidateId");

    const handleSubmit = async () => {
        if (!skill.trim()) {
            console.log("Insira uma habilidade válida.");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/skill/candidateId/${candidateId}`, {
                skill,
            });
            console.log("Habilidade salva com sucesso!");
            setSkill(""); 
            window.location.reload();
        } catch (error) {
            console.error("Erro ao salvar habilidade.", error);
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2, width: '100%' }}>
            <TextField
                label="Habilidade"
                variant="outlined"
                value={skill}
                onChange={(e) => setSkill(e.target.value)} 
                fullWidth
                sx={{   }}
            />
            <Button sx={{ bgcolor: "#87aa68", color: "white", width: '20%' }} variant="contained" color="primary" onClick={handleSubmit}>
                Salvar
            </Button>
        </Box>
    );
}

export default InputSkill;