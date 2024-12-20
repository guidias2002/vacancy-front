import { Box, Divider } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import ListVacancyByEnterprise from '../../components/enterprise/vacancy/ListVacancyByEnterprise'
import Title from '../../components/Title'


const VacancyByEnterprisePage: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            bgcolor: '#fff',
            width: '100%',
            padding: '40px',
            
        }}>

            <Sidebar />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
                <Title title='Minhas Vagas' subTitle='Todas as vagas da empresa estão aqui'/>
                <Divider/>
                <ListVacancyByEnterprise/>
            </Box>
        </Box >
    )
}

export default VacancyByEnterprisePage;