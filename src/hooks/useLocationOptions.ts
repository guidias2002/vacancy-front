import { useState, useEffect } from 'react';
import axios from 'axios';

interface LocationOption {
  label: string;
}

const useLocationOptions = () => {
  const [options, setOptions] = useState<LocationOption[]>([]);

  useEffect(() => {
    const fetchCitiesAndStates = async () => {
      try {
        // busca todas as cidades
        const statesResponse = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const states = statesResponse.data;

        // para cada estado, busca as cidades
        const allCities = await Promise.all(
          states.map(async (state: { id: number; sigla: string }) => {
            const citiesResponse = await axios.get(
              `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/municipios`
            );
            return citiesResponse.data.map((city: { nome: string }) => ({
              label: `${city.nome}, ${state.sigla}`,
            }));
          })
        );

        // transforma os arrays em uma unica lista
        setOptions(allCities.flat());
      } catch (error) {
        console.error("Erro ao buscar cidades e estados:", error);
      }
    };

    fetchCitiesAndStates();
  }, []);

  return options;
};

export default useLocationOptions;
