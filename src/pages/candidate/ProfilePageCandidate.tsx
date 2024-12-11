import Curriculum from "../../components/candidate/aboutCandidate/Curriculum";
import SidebarCandidate from "../../components/Sidebar";

import '../../styles/ProfilePageCandidate.css';

const ProfilePageCandidate = () => {

    return (
        <div className="main-profile-page">
            <SidebarCandidate/>
            <Curriculum/>
        </div>
    )
}

export default ProfilePageCandidate;