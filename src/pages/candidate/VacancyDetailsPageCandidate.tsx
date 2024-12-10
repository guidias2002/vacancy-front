import SidebarCandidate from "../../components/SidebarCandidate";
import VacancyDetails from "../../components/candidate/vacancy/VacancyDetails";
import '../../styles/VacancyDetailPage.css'

const VacancyDetailsPageCandidate = () => {

    return (
        <div className="vacancy-detail-page">
            <SidebarCandidate />
            <VacancyDetails />
        </div>
    )
}

export default VacancyDetailsPageCandidate;