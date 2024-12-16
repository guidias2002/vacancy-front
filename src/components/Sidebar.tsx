import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useAuth } from '../context/AuthProvider';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {

  const auth = useAuth();
  const location = useLocation();

  const accountType = localStorage.getItem('accountType');

  const handleLogout = () => {
    auth.logout();
  };

  const items = accountType === 'CANDIDATE'
    ? [
      { text: 'INÍCIO', icon: <HomeOutlinedIcon />, path: '/dashboard-candidate' },
      { text: 'MEU PERFIL', icon: <PersonOutlinedIcon />, path: '/profile-candidate' },
      { text: 'VAGAS', icon: <CasesOutlinedIcon />, path: '/vacancy' },
      { text: 'MINHAS CANDIDATURAS', icon: <AccountTreeOutlinedIcon />, path: '/my-applications' },
    ]
    : [
      { text: 'INÍCIO', icon: <HomeOutlinedIcon />, path: '/dashboard-enteprise' },
      { text: 'SOBRE', icon: <PersonOutlinedIcon />, path: '' },
      { text: 'MINHAS VAGAS', icon: <CasesOutlinedIcon />, path: '' },
      { text: 'CANDIDATURAS', icon: <AccountTreeOutlinedIcon />, path: '' },
      { text: 'PERFIS', icon: <GroupOutlinedIcon />, path: '' },
    ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ mb: 5, mt: 5 }} noWrap>
          VagasConnect
        </Typography>
      </Toolbar>
      <List sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#f1f8e8',
                },
                textDecoration: 'none',
                backgroundColor: location.pathname === item.path ? '#f1f8e8' : 'transparent',
              }}
            >
              <ListItemIcon sx={{ marginRight: '-16px', color: '#87aa68' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.7rem',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ListItem disablePadding sx={{ mt: 'auto' }}>
        <ListItemButton
          sx={{
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#f1f8e8',
            },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon sx={{ marginRight: '-16px', color: '#87aa68' }}>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary="SAIR"
            sx={{
              '& .MuiTypography-root': {
                fontSize: '0.7rem'
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
