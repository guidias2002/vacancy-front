import axios from "axios";
import { useEffect, useState } from "react"
import { EnterpriseData } from "../../../types/EnterpriseData";
import { Typography } from "@mui/material";


const AboutEnterprise = () => {

    const enterpriseId = localStorage.getItem("userId");
    const [enterprise, setEnteprise] = useState<EnterpriseData | null>(null);
    const URL_ENTERPRISE_BY_ID = `http://localhost:8080/enterprise/${enterpriseId}`;

    useEffect(() => {
        axios.get<EnterpriseData>(URL_ENTERPRISE_BY_ID)
            .then((response) => {
                setEnteprise(response.data);
            })
            .catch((error) => {
                console.log('Erro ao buscar empresa')
            })
    }, [enterpriseId]);

    return (
        <div>
            {enterprise ?
                <div>
                    <p>{enterprise.linkedin}</p>
                    <p>{enterprise.cnpj}</p>
                    <p>{enterprise.name}</p>
                    <p>{enterprise.createdAt}</p>
                    <p>{enterprise.linkedin}</p>
                </div>
                :
                <p>Os dados ainda não foram preenchidos</p>
            }
        </div>
    )
}

export default AboutEnterprise;