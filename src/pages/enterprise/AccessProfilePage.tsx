import React, { useState } from 'react'
import ListRecruiterProfile from '../../components/enterprise/access-profile/ListRecruiterProfile'
import InvitationRecruiter from '../../components/enterprise/access-profile/InvitationRecruiter';
import Sidebar from '../../components/Sidebar';

import '../../styles/AccessProfilePage.css';
import Title from '../../components/Title';
import { Divider } from '@mui/material';
import RecruiterDetails from '../../components/enterprise/access-profile/RecruiterDetails';

const AccessProfilePage: React.FC = () => {

    const [selectedRecruiter, setSelectedRecruiter] = useState<number | null>(null);

    const handleRecruiterClick = (id: number) => {
        setSelectedRecruiter(id);
    };

    const handleBackToForm = () => {
        setSelectedRecruiter(null);
    };

    return (
        <div className='main-profile'>
            <Sidebar />

            <div className='main-section-profile'>
                <Title
                    title="Perfis "
                    subTitle="Visualize e gerencie todos os perfis de recrutadores da empresa"
                />

                <Divider sx={{ bgColor: 'rgba(151, 166, 138, 0.47)', marginTop: '20px' }} />

                <div className='section-profile-recruiter'>
                    <ListRecruiterProfile onRecruiterClick={handleRecruiterClick} />
                    <Divider orientation="vertical" flexItem sx={{ height: '100%' }}/>
                    {selectedRecruiter ? (
                        <RecruiterDetails
                            recruiterId={selectedRecruiter}
                            onBack={handleBackToForm}
                        />
                    ) : (
                        <InvitationRecruiter />
                    )}
                </div>
            </div>
        </div>

    )
}

export default AccessProfilePage;