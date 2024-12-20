import { useEffect, useState } from "react";
import { Vacancy } from "../../../types/VacancyData";
import axios from "axios";
import '../../../styles/VacancyList.css';
import Loading from "../../Loading";
import VacancyCard from "../../VacancyCard";


const VacancyList: React.FC = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      axios.get<Vacancy[]>('http://localhost:8080/vacancy/getAll')
        .then(response => {
          setVacancies(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar vagas:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
    if (loading) return <Loading/>;
  
    return (
      <div className="vacancy-list">
        {vacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    );
  };
  
  export default VacancyList;