import React from 'react'
import ListRecruiterProfile from '../../components/enterprise/access-profile/ListRecruiterProfile'
import InvitationRecruiter from '../../components/enterprise/access-profile/InvitationRecruiter';
import Sidebar from '../../components/Sidebar';

import '../../styles/AccessProfilePage.css';

const AccessProfilePage: React.FC = () => {

    return (
        <div className='main-profile'>
            <Sidebar/>

            <div className='main-section-profile'>   
                <ListRecruiterProfile/>
                <InvitationRecruiter/>
            </div>
        </div>
        
    )
}

export default AccessProfilePage;