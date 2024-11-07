import React from 'react';
import { Vacancy } from '../../types/VacancyData';
import '../../styles/VacancyCard.css';
import { FaBriefcase, FaLaptop } from 'react-icons/fa';
import { Divider } from '@mui/material';

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  return (
    <div className="vacancy-card">
      <div className="vacancy-card-header">
        <p className="company-name">{vacancy.name_enterprise}</p>
      </div>

      <h3 className="job-title">{vacancy.title}</h3>

      <div className="details">
        <div className="modality">
          <FaLaptop /> <span>{vacancy.modality}</span>
        </div>
        <div className="level">
          <FaBriefcase /> <span>{vacancy.level}</span>
        </div>
      </div>

      <Divider sx={{mt: 1, mb: 1}} />

      <p className="published-date">
        Publicada em: {new Date(vacancy.createdAt).toLocaleDateString('pt-BR')}
      </p>
    </div>
  );
};

export default VacancyCard;
