import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
  size?: number;
  color?: string; 
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 60, color = '#87aa68', message }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      margin="0 auto"
    >
      <CircularProgress 
        size={size} 
        sx={{ color }} 
      />
      {message && <Box mt={2} color="text.secondary">{message}</Box>}
    </Box>
  );
};

export default Loading;
