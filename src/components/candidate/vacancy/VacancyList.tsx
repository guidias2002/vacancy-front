import { useEffect, useState } from "react";
import { Vacancy } from "../../../types/VacancyData";
import axios from "axios";
import Loading from "../../Loading";
import VacancyCard from "../../VacancyCard";


const VacancyList: React.FC = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      axios.get<Vacancy[]>('http://localhost:8080/vacancy/getAllByActive')
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
      <div className='grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] grid-rows-auto gap-5 w-full'>
        {vacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    );
  };
  
  export default VacancyList;