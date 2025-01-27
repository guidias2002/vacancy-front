import AboutEnterprise from '../../components/enterprise/about/AboutEnterprise';
import Sidebar from '../../components/Sidebar'
import Title from '../../components/Title';
import { Divider } from '@mui/material';

const AboutEnterprisePage = () => {


  return (
    <div className='w-full flex bg-color-gray p-10 h-screen'>
        <Sidebar />

        <div className='w-full flex-col'>
            <Title 
                title='Sobre a empresa'
                subTitle='Informações gerais sobre a empresa'
            />
            <Divider/>
            <AboutEnterprise/>
        </div>
    </div>
  )
}

export default AboutEnterprisePage;