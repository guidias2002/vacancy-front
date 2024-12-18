import React from 'react'
import ListRecruiterProfile from '../../components/enterprise/access-profile/ListRecruiterProfile'
import InvitationRecruiter from '../../components/enterprise/access-profile/InvitationRecruiter';
import Sidebar from '../../components/Sidebar';

import '../../styles/AccessProfilePage.css';
import Title from '../../components/Title';
import { Divider } from '@mui/material';

const AccessProfilePage: React.FC = () => {

    return (
        <div className='main-profile'>
            <Sidebar />

            <div className='main-section-profile'>
                <Title
                    title="Perfis "
                    subTitle="Visualize e gerencie todos os perfis de recrutadores da empresa"
                />

                <Divider sx={{ bgColor:'rgba(151, 166, 138, 0.47)', marginTop: '20px' }}/>

                <div className='section-profile-recruiter'>
                    <ListRecruiterProfile />
                    <InvitationRecruiter />
                </div>
            </div>
        </div>

    )
}

export default AccessProfilePage;