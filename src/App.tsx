import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/candidate/LoginPageCandidate'
import RegisterPage from './pages/candidate/RegisterPageCandidate'
import HomePage from './pages/HomePage'
import DashboardCandidate from './pages/candidate/DashboardCandidate'
import ProtectedRoute from './context/ProtectedRoute'
import ProfilePageCandidate from './pages/candidate/ProfilePageCandidate'
import VacancyPageCandidate from './pages/candidate/VacancyPageCandidate'
import ApplicationsPageCandidate from './pages/candidate/ApplicationsPageCandidate'
import VacancyDetailsPageCandidate from './pages/candidate/VacancyDetailsPageCandidate'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import LoginEnterprisePage from './pages/enterprise/LoginEnterprisePage'
import DashboardEnterprise from './pages/enterprise/DashboardEnterprise'
import LoginRecruiterPage from './pages/recruiter/LoginRecruiterPage'
import AccessProfilePage from './pages/enterprise/AccessProfilePage'

interface RouteConfig {
  path: string;
  component: JSX.Element;
  isProtected: boolean;
  accountType?: ("CANDIDATE" | "ENTERPRISE" | "RECRUITER")[];
}

function App() {
  const routes: RouteConfig[] = [

    // candidate
    
    { path: '/', component: <HomePage />, isProtected: false },
    { path: '/login', component: <LoginPage />, isProtected: false },
    { path: '/register', component: <RegisterPage />, isProtected: false },
    { path: '/dashboard-candidate', component: <DashboardCandidate />, isProtected: true, accountType: ['CANDIDATE'] },
    { path: '/profile-candidate', component: <ProfilePageCandidate />, isProtected: true, accountType: ['CANDIDATE'] },
    { path: '/vacancy', component: <VacancyPageCandidate />, isProtected: true, accountType: ['CANDIDATE'] },
    { path: '/vacancy/:id', component: <VacancyDetailsPageCandidate />, isProtected: true, accountType: ['CANDIDATE'] },
    { path: '/my-applications', component: <ApplicationsPageCandidate />, isProtected: true, accountType: ['CANDIDATE'] },

    // enterprise

    {path: '/login-enterprise', component: <LoginEnterprisePage />, isProtected: false},
    {path: '/dashboard-enteprise', component: <DashboardEnterprise />, isProtected: true, accountType: ['ENTERPRISE', 'RECRUITER']},
    {path: '/access-profile', component: <AccessProfilePage />, isProtected: true, accountType: ['ENTERPRISE']},

    // recruiter

    {path: '/login-recruiter', component: <LoginRecruiterPage />, isProtected: false},
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {routes.map(({ path, component, isProtected, accountType }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected && accountType ? (
                <ProtectedRoute isProtected={isProtected} accountType={accountType}>{component}</ProtectedRoute>
              ) : (
                component
              )
            }
          />
        ))}
      </Routes>
    </ThemeProvider>
  );
}


export default App;
