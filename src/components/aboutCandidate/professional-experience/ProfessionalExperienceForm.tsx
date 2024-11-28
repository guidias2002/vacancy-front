import React from 'react';
import { Box, Typography } from '@mui/material';

import FormAccordion from '../../FormAccordion';
import AddIcon from '@mui/icons-material/Add';

const ProfessionalExperienceForm: React.FC = () => {

    return (
        <FormAccordion title='Experiência profissional'>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "20px 16px",
                    cursor: 'pointer'
                }}

            >
                <Typography sx={{ fontWeight: 'bold', color: '#87aa68' }}>Adicionar Experiência</Typography>
                <AddIcon sx={{ color: '#87aa68' }} />
            </Box>

        </FormAccordion >
    );
};

export default ProfessionalExperienceForm;
