import AboutMeForm from "../../components/aboutCandidate/AboutMeForm";

import '../../styles/Curriculum.css';
import Title from "../Title";
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
        </div>
    )
}

export default Curriculum;