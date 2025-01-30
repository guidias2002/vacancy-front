import AboutEnterprise from '../../components/enterprise/about/AboutEnterprise';
import ListVacancyByEnterpriseAboutMe from '../../components/enterprise/vacancy/ListVacancyByEntepriseAboutMe';
import Sidebar from '../../components/Sidebar'
import Title from '../../components/Title';
import { Divider } from '@mui/material';


const AboutEnterprisePage = () => {


  return (
    <div className='w-full h-screen flex justify-start bg-color-gray p-10 font-montserrat'>
      <Sidebar />

      <div className='grid flex-1 w-full gap-4'>
        <Title
          title='Sobre a empresa'
          subTitle='Informações gerais sobre a empresa'
        />
        <Divider />
        <AboutEnterprise />
        <Divider />
        <ListVacancyByEnterpriseAboutMe maxVacancies={3} />
      </div>

    </div>
  )
}

export default AboutEnterprisePage;