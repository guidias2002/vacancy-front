import { Divider } from "@mui/material";
import SidebarCandidate from "../../components/Sidebar"
import Title from "../../components/Title";
import VacancyList from "../../components/candidate/vacancy/VacancyList";

const VacancyPageCandidate = () => {

    return (
        <div className='h-screen flex bg-color-gray'>
            <SidebarCandidate />

            <div className='flex flex-col w-full p-10 gap-5'>
                <Title
                    title="Vagas disponíveis"
                    subTitle="Explore as oportunidades disponíveis e encontre a vaga ideal para seu perfil profissional"
                />
                <Divider/>
                <VacancyList />
            </div>
        </div>
    )
}

export default VacancyPageCandidate;