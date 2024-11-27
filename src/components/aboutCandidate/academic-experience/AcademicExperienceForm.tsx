import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormAccordion from "../../FormAccordion";

import '../../../styles/AcademicExperienceForm.css';
import AcademicExperienceFormPopup from "./AcademicExperienceFormPopup";
import { useState } from "react";
import AcademicExperienceList from "./AcademicExperienceList";
import AddIcon from '@mui/icons-material/Add';

const AcademicExperienceForm: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <FormAccordion title="Experiência Acadêmica">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AcademicExperienceList/>
                <Button
                    sx={{
                        color: '#87aa68',
                        borderColor: 'transparent',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                        },
                    }}
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    >
                    Adicionar Experiência
                </Button>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>Adicionar Experiência Acadêmica</DialogTitle>
                    <DialogContent>
                        <AcademicExperienceFormPopup onClose={handleClose} />
                    </DialogContent>
                </Dialog>
            </Box>
        </FormAccordion>
    );
}

export default AcademicExperienceForm;