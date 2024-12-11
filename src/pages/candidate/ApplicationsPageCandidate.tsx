import CandidateApplicationList from "../../components/candidate/applications/CandidationApplicationList";
import SidebarCandidate from "../../components/Sidebar"
import Title from "../../components/Title";
import '../../styles/ApplicationPage.css'

const ApplicationsPageCandidate = () => {

    return (
        <div className="application-page">
            <SidebarCandidate />

            <div className="main-section-application-page">
                <Title
                    title="Minhas candidaturas"
                    subTitle="Visualize e gerencie todas as suas candidaturas em um só lugar"
                />
                <CandidateApplicationList />
            </div>
        </div>
    )
}

export default ApplicationsPageCandidate;