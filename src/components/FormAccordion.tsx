import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FormAccordionProps {
    title: string;
    children: React.ReactNode;
}

const FormAccordion: React.FC<FormAccordionProps> = ({ title, children }) => {
    return (
        <Accordion sx={{ width: '800px', margin: '0 auto', padding: '20px 5px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${title.toLowerCase().replace(/ /g, '-')}-content`}
                id={`${title.toLowerCase().replace(/ /g, '-')}-header`}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default FormAccordion;
