import AboutMeForm from "../../components/aboutCandidate/AboutMeForm";

import '../../styles/Curriculum.css';
import Title from "../Title";
import AcademicExperienceForm from "./academic-experience/AcademicExperienceForm";
import ProfessionalExperienceForm from "./ProfessionalExperienceForm";

const Curriculum = () => {

    return (
        <div className="main-curriculum">
            <Title
                title="Currículo"
                subTitle="Visão Geral das Qualificações e Experiências Profissionais"
            />
            <AboutMeForm/>
            <ProfessionalExperienceForm/>
            <AcademicExperienceForm/>
        </div>
    )
}

export default Curriculum;