import SidebarCandidate from "../../components/SidebarCandidate"
import Title from "../../components/Title";
import VacancyList from "../../components/candidate/vacancy/VacancyList";
import '../../styles/VacancyPageCandidate.css';

const VacancyPageCandidate = () => {

    return (
        <div className="vacancy-page">
            <SidebarCandidate />

            <div className="main-section-vacancy">
                <Title
                    title="Vagas disponíveis"
                    subTitle="Explore as oportunidades disponíveis e encontre a vaga ideal para seu perfil profissional"
                />
                <VacancyList />
            </div>
        </div>
    )
}

export default VacancyPageCandidate;