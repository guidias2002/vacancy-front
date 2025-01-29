import { Application } from "../../../types/ApplicationData";
import { TableCell, TableRow } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import '../../../styles/CandidationApplication.css';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface CandidateApplicationsProps {
  application: Application;
}

const CandidateApplications: React.FC<CandidateApplicationsProps> = ({ application }) => {

  const navigate = useNavigate();

  return (
    <TableRow
      className='hover:cursor-pointer hover:bg-color-table-row'
      onClick={() => navigate(`/vacancyDetails/${application.vacancyId}`)}
      key={application.id}
    >
      <TableCell>{application.vacancyId}</TableCell>
      <TableCell>{application.enterpriseName}</TableCell>
      <TableCell>{application.vacancyTitle}</TableCell>
      <TableCell>{format(new Date(application.createdAt), "dd/MM/yyyy, HH:mm:ss")}</TableCell>
      <TableCell align='right'><KeyboardArrowRightIcon /></TableCell>
    </TableRow>
  );
}

export default CandidateApplications;