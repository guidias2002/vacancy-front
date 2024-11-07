import { Alert, Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useCandidateLoginForm } from "../../hooks/useCandidateLoginForm";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";
import { Link } from "react-router-dom";

const CandidateLoginForm: React.FC = () => {
  const { loginData, handleChange, handleSubmit, error, loading } = useCandidateLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <Box sx={{ maxWidth: 350, mx: 'auto', mt: 5 }}>
      <Typography sx={{ mb: 2 }} variant="h5" align="left">
        Acesse sua conta
      </Typography>

      <Typography sx={{ mb: 2 }} align="left">
        Ainda não tem conta?{' '}
        <Typography
          component={Link}
          to="/register"
          color="success"
          sx={{
            textDecoration: 'underline',
          }}
        >
          Criar conta
        </Typography>
      </Typography>

      <Divider />

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Login ou Email"
          name="loginOrEmail"
          value={loginData.loginOrEmail}
          onChange={handleChange}
          color="success"
        />

        <TextField
          fullWidth
          margin="normal"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={loginData.password}
          onChange={handleChange}
          color="success"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          color="success"
          type="submit"
          sx={{ mt: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Entrar'}
        </Button>
      </form>
    </Box>
  );
};

export default CandidateLoginForm;