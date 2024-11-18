import { Box, TextField, Typography } from "@mui/material";
import FormAccordion from "../FormAccordion";

const AcademicExperienceForm: React.FC = () => {


    return (
        <FormAccordion title="Experiência acadêmica">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ margin: '5px 0', fontSize: '1rem', fontWeight: 'bold' }}>Experiência acadêmica</Typography>
                <TextField
                    label="Curso"
                    name="course"
                />
                <TextField
                    label="Instituição de ensino"
                    name="institution"
                />

                <div className="levelAndStatus">
                    <TextField
                        label="Nível"
                        name="level"
                    />
                    <TextField
                        label="Status"
                        name="status"
                    />
                </div>


            </Box>
        </FormAccordion>
    );
}

export default AcademicExperienceForm;