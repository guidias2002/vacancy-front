import CandidateApplicationList from "../../components/applications/CandidationApplicationList";
import SidebarCandidate from "../../components/SidebarCandidate"
import '../../styles/ApplicationPage.css'

const ApplicationsPageCandidate = () => {

    return (
        <div className="application-page">
            <SidebarCandidate/>
            <CandidateApplicationList/>
        </div>
    )
}

export default ApplicationsPageCandidate;