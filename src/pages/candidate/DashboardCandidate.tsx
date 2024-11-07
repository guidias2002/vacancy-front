import Navbar from "../../components/Navbar";
import SidebarCandidate from "../../components/SidebarCandidate";
import '../../styles/DashboardPage.css';

const DashboardCandidate = () => {
    return (
        <div className="dashboard-page">
            <SidebarCandidate />
            <div className="main-content">
                <Navbar />
                <div className="content-area">
                    {/* Coloque aqui o conteúdo principal */}
                </div>
            </div>
        </div>
    );
};

export default DashboardCandidate;