import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Vacancy } from "../../types/VacancyData";
import ButtonCandidacy from "./ButtonCandidacy";
import { FaBriefcase, FaMoneyBill } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";

import '../../styles/VacancyDetail.css';

const VacancyDetails = () => {

    const { id } = useParams<{ id: string }>();
    const candidateId = localStorage.getItem("candidateId") || "";

    const [vacancie, setVacancie] = useState<Vacancy | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Vacancy>(`http://localhost:8080/vacancy/${id}`)
            .then(response => {
                setVacancie(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar vagas:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!vacancie) {
        return <div>Vaga não encontrada!</div>;
    }

    return (
        <section className="main-section">
            <div>

                <h1>{vacancie.title}</h1>
                <div className="vacancy-details">
                    <div className="modality-details">
                        <RiComputerFill /> <span>{vacancie.modality}</span>
                    </div>
                    <div className="level-details">
                        <FaBriefcase /> <span>{vacancie.level}</span>
                    </div>
                    <div className="location-details">
                        <FaLocationDot /> <span>{vacancie.location}</span>
                    </div>
                    <div className="remuneration-details">
                        <FaMoneyBill /> <span>{vacancie.remuneration}</span>
                    </div>
                </div>

                <div>
                    <p>Empresa</p>
                    <p>{vacancie.name_enterprise}</p>
                </div>

                <div>
                    <p>Publicada</p>
                    <p>{new Date(vacancie.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>

                <div>
                    <p>Descrição</p>
                    <p>{vacancie.description}</p>
                </div>

                {candidateId && (
                    <ButtonCandidacy vacancyId={id || ""} candidateId={candidateId} />
                )}
            </div>
        </section>


    )
}

export default VacancyDetails;