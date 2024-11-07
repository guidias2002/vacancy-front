import { Alert, Box, Button, CircularProgress, Divider, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useCandidateRegisterForm } from '../../hooks/useCandidateRegisterForm';
import { useState } from 'react';


const CandidateRegistrationForm: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    successMessageOpen,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  } = useCandidateRegisterForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ maxWidth: 350, mx: 'auto', mt: 5 }}>

      <Typography sx={{ mb: 2 }} variant="h5" align="left">
        Bem-vindos à VagasConnect
      </Typography>

      <Typography sx={{ mb: 2 }} align="left">
        Já tem conta? {' '}
        <Typography
          component={Link}
          to="/login"
          color="success"
          sx={{
            textDecoration: 'underline',
          }}>
          Acessar conta
        </Typography>
      </Typography>

      <Divider />

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          color="success"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          error={!!errors.login}
          helperText={errors.login}
          color="success"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Senha"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
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
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          color="success"
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          type="submit"
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
        </Button>
      </form>

      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidateRegistrationForm;
