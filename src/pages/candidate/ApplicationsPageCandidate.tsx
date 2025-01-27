import { Box, Divider } from "@mui/material";
import CandidateApplicationList from "../../components/candidate/applications/CandidationApplicationList";
import SidebarCandidate from "../../components/Sidebar"
import Title from "../../components/Title";
import '../../styles/ApplicationPage.css'

const ApplicationsPageCandidate = () => {

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            bgcolor: '#fff',
            width: '100%',
            padding: '40px',
        }}>
            <SidebarCandidate />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Title
                    title="Minhas candidaturas"
                    subTitle="Visualize e gerencie todas as suas candidaturas em um só lugar"
                />
                <Divider sx={{ marginTop: '30px' }}/>
                <CandidateApplicationList />
            </Box>
        </Box>
    )
}

export default ApplicationsPageCandidate;