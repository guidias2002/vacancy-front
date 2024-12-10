import { useEffect, useState } from "react";
import Skill from "../../../types/Skill";
import axios from "axios";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SkillList: React.FC = () => {

    const candidateId = localStorage.getItem("userId");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skill, setSkill] = useState<Skill[] | null>(null);

    useEffect(() => {
        if (!candidateId) {
            setError("ID do candidato não encontrado.");
            setLoading(false);
            return;
        }

        axios.get<Skill[]>(`http://localhost:8080/skill/getSkillsByCandidateId/${candidateId}`)
            .then((response) => {
                setSkill(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Erro ao buscar as habilidades.");
                setLoading(false);
            });
    }, [candidateId]);


    const onDeleteSkill = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/skill/delete/${id}`);
            console.log("Excluído com sucesso");

            setSkill((prev) => {
                return prev ? prev.filter((exp) => exp.id !== id) : null;
            });
        } catch (error) {
            console.error("Erro ao excluir habilidade:", error);
        }
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {skill && skill.length > 0 ? (
                skill.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill.skill}
                        onDelete={() => onDeleteSkill(skill.id)}
                        deleteIcon={<HighlightOffIcon style={{ color: "#87aa68" }} fontSize="small" />}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #87aa68",
                            padding: "5px",
                            color: '#87aa68',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                        variant="outlined"
                    />
                ))
            ) : (
                <Typography>Nenhuma habilidade encontrada.</Typography>
            )}
        </Box>
    );
}

export default SkillList;