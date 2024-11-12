import AboutMeForm from "../../components/aboutCandidate/AboutMeForm";

import '../../styles/Curriculum.css';
import ProfessionalExperienceForm from "./ProfessionalExperienceForm";

const Curriculum = () => {

    return (
        <div className="main-curriculum">
            <AboutMeForm/>
            <ProfessionalExperienceForm/>
        </div>
    )
}

export default Curriculum;