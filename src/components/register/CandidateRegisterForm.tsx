import { Alert, Box, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cadastro de Candidato
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
          error={!!errors.login}
          helperText={errors.login}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Senha"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          error={!!errors.password}
          helperText={errors.password}
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
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          component={RouterLink}
          to="/login"
        >
          Já tenho perfil
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
