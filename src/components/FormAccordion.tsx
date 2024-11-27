import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FormAccordionProps {
    title: string;
    children: React.ReactNode;
}

const FormAccordion: React.FC<FormAccordionProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const storageKey = `accordion-expanded-${title.toLowerCase().replace(/ /g, '-')}`;

    useEffect(() => {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue !== null) {
            setExpanded(storedValue === 'true');
        }
    }, [storageKey]);

    const handleChange = () => {
        const newExpanded = !expanded;
        setExpanded(newExpanded);
        localStorage.setItem(storageKey, newExpanded.toString());
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={handleChange}
            sx={{
                width: '100%',
                margin: '0 auto',
                padding: '20px 5px',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                borderRadius: '20px',
                '&.MuiAccordion-root:before': {
                    display: 'none',
                },
                '&:last-of-type': {
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${title.toLowerCase().replace(/ /g, '-')}-content`}
                id={`${title.toLowerCase().replace(/ /g, '-')}-header`}
            >
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default FormAccordion;