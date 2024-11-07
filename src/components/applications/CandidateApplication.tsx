import { Application } from "../../types/ApplicationData";
import '../../styles/CandidateApplication.css';

interface CandidateApplicationsProps {
  application: Application; 
}

const CandidateApplications: React.FC<CandidateApplicationsProps> = ({ application }) => {
  return (
    <div className="application-details">
      <h2>Detalhes da Aplicação</h2>
      <div className="field">
        <strong>ID da Vaga:</strong> {application.vacancyId}
      </div>
      <div className="field">
        <strong>Título da Vaga:</strong> {application.vacancyTitle}
      </div>
      <div className="field">
        <strong>Nome da Empresa:</strong> {application.enterpriseName}
      </div>
      <div className="field">
        <strong>Data de candidatura:</strong> {new Date(application.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

export default CandidateApplications;