import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
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
                <AcademicExperienceList />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "20px 16px",
                        cursor: 'pointer'
                    }}
                    onClick={handleOpen}
                >
                    <Typography sx={{ fontWeight: 'bold', color: '#87aa68' }}>Adicionar Experiência</Typography>
                    <AddIcon sx={{ color: '#87aa68' }} />
                </Box>

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