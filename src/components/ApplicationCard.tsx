import React from 'react'
import { Application } from '../types/ApplicationData'
import { TableCell, TableRow } from '@mui/material'
import { format } from 'date-fns';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ApplicationCardProps {
    application: Application
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
    return (
        <TableRow sx={{
            ":hover": {
                cursor: 'pointer',
                backgroundColor: 'rgba(193, 224, 166, 0.07)'
            }
        }}
            key={application.id}>
            <TableCell>{application.vacancyId}</TableCell>
            <TableCell>{application.vacancyTitle}</TableCell>
            <TableCell>{application.candidateName}</TableCell>
            <TableCell>{format(new Date(application.createdAt), "dd/MM/yyyy, HH:mm:ss")}</TableCell>
            <TableCell align='right'><KeyboardArrowRightIcon /></TableCell>
        </TableRow>
    )
}

export default ApplicationCard