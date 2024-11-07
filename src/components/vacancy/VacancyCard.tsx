import React from 'react';
import { Vacancy } from '../../types/VacancyData';
import { FaBriefcase, FaMoneyBill } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

import '../../styles/VacancyCard.css';

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  return (
    <Link to={`/vacancy/${vacancy.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="vacancy-card">
        <div className="vacancy-card-header">
          <p className="company-name">{vacancy.name_enterprise}</p>
        </div>

        <h3 className="job-title">{vacancy.title}</h3>

        <div className="details">
          <div className="modality">
            <RiComputerFill /> <span>{vacancy.modality}</span>
          </div>
          <div className="level">
            <FaBriefcase /> <span>{vacancy.level}</span>
          </div>
          <div className="location">
            <FaLocationDot /> <span>{vacancy.location}</span>
          </div>
          <div className="remuneration">
            <FaMoneyBill /> <span>{vacancy.remuneration}</span>
          </div>
        </div>

        <Divider sx={{ mt: 2 }} />

        <p className="published-date">
          Publicada em: {new Date(vacancy.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </Link>
  );
};

export default VacancyCard;
