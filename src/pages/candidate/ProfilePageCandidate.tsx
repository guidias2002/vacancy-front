import Curriculum from "../../components/candidate/aboutCandidate/Curriculum";
import SidebarCandidate from "../../components/SidebarCandidate";

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