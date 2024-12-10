import AboutMeForm from "../aboutCandidate/AboutMeForm";

import '../../../styles/Curriculum.css';
import Title from "../../Title";
import AcademicExperienceForm from "../../candidate/academic-experience/AcademicExperienceForm";
import LanguageComponent from "../../candidate/language-experience/LanguageComponent";
import ProfessionalExperienceForm from "../../candidate/professional-experience/ProfessionalExperienceForm";
import SkillForm from "../../candidate/skill/SkillForm";

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
            <SkillForm/>
            <LanguageComponent/>
        </div>
    )
}

export default Curriculum;