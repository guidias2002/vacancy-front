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


function App() {
  const routes = [
    { path: '/', component: <HomePage /> },
    { path: '/login', component: <LoginPage /> },
    { path: '/register', component: <RegisterPage /> },
    { path: '/dashboard-candidate', component: <DashboardCandidate />, protected: true },
    { path: '/profile-candidate', component: <ProfilePageCandidate />, protected: true },
    { path: '/vacancy', component: <VacancyPageCandidate />, protected: true },
    { path: '/vacancy/:id', component: <VacancyDetailsPageCandidate />, protected: true },
    { path: '/my-applications', component: <ApplicationsPageCandidate />, protected: true },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {routes.map(({ path, component, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? <ProtectedRoute>{component}</ProtectedRoute> : component
            }
          />
        ))}
      </Routes>
    </ThemeProvider>
  );
}


export default App;
