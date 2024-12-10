import axios from "axios";
import { useState } from "react";


interface ButtonCandidacyProps {
    vacancyId: string; 
    candidateId: string;
}

const ButtonCandidacy: React.FC<ButtonCandidacyProps> = ({ vacancyId, candidateId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCandidacy = async () => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            await axios.post(`http://localhost:8080/candidacy/vacancy/${vacancyId}/candidate/${candidateId}`);
            setSuccess("Candidatura enviada com sucesso!");
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setError("O candidato já se inscreveu na vaga");
            } else {
                setError("Erro ao enviar candidatura. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleCandidacy} disabled={loading}>
                {loading ? "Enviando..." : "Enviar Candidatura"}
            </button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ButtonCandidacy;