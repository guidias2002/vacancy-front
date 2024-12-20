import React from 'react'
import ListEnterpriseApplication from '../../components/enterprise/candidacy/ListEnterpriseApplication';
import { Box, Divider } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Title from '../../components/Title';

const EnterpriseApplicationsPage: React.FC = () => {


    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            bgcolor: '#fff',
            width: '100%',
            padding: '40px',
        }}>

            <Sidebar />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Title title='Candidaturas' subTitle='Aqui estão todas as candidaturas de vagas publicadas pela empresa'/>
                <Divider sx={{ marginTop: '30px' }}/>
                <ListEnterpriseApplication />
            </Box>
        </Box>
    )
}

export default EnterpriseApplicationsPage;