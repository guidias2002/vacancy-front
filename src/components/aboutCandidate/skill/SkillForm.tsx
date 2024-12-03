import { Box } from "@mui/material";
import FormAccordion from "../../FormAccordion";
import InputSkill from "./InputSkill";
import SkillList from "./SkillList";

const SkillForm: React.FC = () => {

    return (
        <FormAccordion title="Habilidades">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <InputSkill/>
                <SkillList/>
            </Box>
        </FormAccordion>
    );
};

export default SkillForm;