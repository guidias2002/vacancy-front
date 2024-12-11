import { Application } from "../../../types/ApplicationData";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

import '../../../styles/CandidationApplication.css';

interface CandidateApplicationsProps {
  application: Application;
}

const CandidateApplications: React.FC<CandidateApplicationsProps> = ({ application }) => {
  return (

    <Link to={`/vacancy/${application.vacancyId}`} style={{ textDecoration: 'none', color: 'inherit', height: '200px' }}>
      <div className="application-details">
        <div className="field">
          <h3 className="field-title">{application.vacancyTitle}</h3>
          <p>{application.enterpriseName}</p>
          <p>Id da vaga: {application.vacancyId}</p>
        </div>

        <Divider sx={{ mb: 1 }} />

        <div className="field-date">
          <p>Data/Hora da candidatura: {new Date(application.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}

export default CandidateApplications;