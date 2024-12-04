import { Box } from "@mui/material";
import FormAccordion from "../../FormAccordion";
import LanguageForm from "./LanguageForm";

const LanguageComponent: React.FC = () => {

    return (
        <FormAccordion title="Idiomas">
            <Box>
                <LanguageForm/>
            </Box>
        </FormAccordion>
    );
}

export default LanguageComponent;