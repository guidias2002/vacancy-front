import React, { useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

import FormAccordion from '../../FormAccordion';
import AddIcon from '@mui/icons-material/Add';
import ProfessionalExperienceList from './ProfessionalExperienceList';
import ProfessionalExperienceFormPopup from './ProfessionalExperienceFormPopup';

const ProfessionalExperienceForm: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <FormAccordion title='Experiência profissional'>
            <ProfessionalExperienceList />
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
                <DialogTitle>Adicionar Experiência Profissional</DialogTitle>
                <DialogContent>
                    <ProfessionalExperienceFormPopup onClose={handleClose} />
                </DialogContent>
            </Dialog>

        </FormAccordion >
    );
};

export default ProfessionalExperienceForm;
