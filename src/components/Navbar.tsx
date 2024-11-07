import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {

    const candidateName = localStorage.getItem("candidateName");

    return (
        <AppBar
            sx={{
                backgroundColor: 'white',
                color: 'black', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
            }}
            position="static"
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                    <AccountCircleIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {candidateName}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;