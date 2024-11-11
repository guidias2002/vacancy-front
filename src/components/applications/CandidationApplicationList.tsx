import { useEffect, useState } from "react";
import { Application } from "../../types/ApplicationData";
import axios from "axios";
import CandidationApplication from "./CandidationApplication";

import '../../styles/CandidationApplicationList.css';

const CandidateApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const storedCandidateId = localStorage.getItem("candidateId");

  useEffect(() => {
    if (storedCandidateId) {
      axios.get<Application[]>(`http://localhost:8080/candidacy/candidateId/${storedCandidateId}`)
        .then(response => {
          setApplications(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar vagas:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error('Candidate ID não encontrado no localStorage');
      setLoading(false);
    }
  }, [storedCandidateId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="application-list"> 
      {applications.map(application => (
        <CandidationApplication key={application.id} application={application} />
      ))}
    </div>
  );
};

export default CandidateApplicationList;