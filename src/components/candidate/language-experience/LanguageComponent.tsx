import { Box, Divider } from "@mui/material";
import FormAccordion from "../../FormAccordion";
import LanguageForm from "./LanguageForm";
import LanguageList from "./LanguageList";

const LanguageComponent: React.FC = () => {

    return (
        <FormAccordion title="Idiomas">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <LanguageForm/>
                <Divider/>
                <LanguageList/>
            </Box>
        </FormAccordion>
    );
}

export default LanguageComponent;