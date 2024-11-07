import SidebarCandidate from "../../components/SidebarCandidate"
import VacancyList from "../../components/vacancy/VacancyList";
import '../../styles/VacancyPageCandidate.css';

const VacancyPageCandidate = () => {

    return (
        <div className="vacancy-page">
            <SidebarCandidate/>
            <VacancyList/>
        </div>
    )
}

export default VacancyPageCandidate;