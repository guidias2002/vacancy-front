import axios from "axios";
import { useEffect, useState } from "react"
import { EnterpriseData } from "../../../types/EnterpriseData";


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
                console.log('Erro ao buscar empresa', error)
            })
     }, [enterpriseId]);

    return (
        <div>
            {enterprise ?
                <div className='w-[700px] grid gap-4'>
                    <div className="flex justify-between">
                        <div>
                            <p className="font-[500]">Nome</p>
                            <p>{enterprise.name}</p>
                        </div>

                        <div>
                            <p className="font-[500]">CNPJ</p>
                            <p>{enterprise.cnpj}</p>
                        </div>
                    </div>
                    
                    <div>
                        <p className="font-[500]">Setor</p>
                        <p>{enterprise.aboutCompany?.sector}</p>
                    </div>

                    <div>
                        <p className="font-[500]">Email</p>
                        <p>{enterprise.email}</p>
                    </div>

                    <div>
                        <p className="font-[500]">Quem somos</p>
                        <p>{enterprise.aboutCompany?.about}</p>
                    </div>

                    <div>
                        <p className="font-[500]">Linkedin</p>
                        <p>{enterprise.aboutCompany?.linkedin}</p>
                    </div>
                    
                </div>
                :
                <p>Os dados ainda não foram preenchidos</p>
            }
        </div>
    )
}

export default AboutEnterprise;