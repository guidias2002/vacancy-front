import { Application } from "../../../types/ApplicationData";
import { Divider, TableCell, TableRow } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import '../../../styles/CandidationApplication.css';
import { format } from "date-fns";

interface CandidateApplicationsProps {
  application: Application;
}

const CandidateApplications: React.FC<CandidateApplicationsProps> = ({ application }) => {
  return (
    <TableRow sx={{
      ":hover": {
        cursor: 'pointer',
        backgroundColor: 'rgba(193, 224, 166, 0.07)'
      }
    }}
      key={application.id}>
      <TableCell>{application.vacancyId}</TableCell>
      <TableCell>{application.enterpriseName}</TableCell>
      <TableCell>{application.vacancyTitle}</TableCell>
      <TableCell>{format(new Date(application.createdAt), "dd/MM/yyyy, HH:mm:ss")}</TableCell>
      <TableCell align='right'><KeyboardArrowRightIcon /></TableCell>
    </TableRow>
  );
}

export default CandidateApplications;