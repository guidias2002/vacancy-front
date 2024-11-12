import Curriculum from "../../components/Curriculum";
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