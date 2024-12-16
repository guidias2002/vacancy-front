import { Alert, Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import React, { useState } from 'react'
import useRecruiterLoginForm from '../../../hooks/useRecruiterLoginForm';


const RecruiterLoginForm: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {loginData, handleSubmit, handleChange, error, loading} = useRecruiterLoginForm();

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={{ maxWidth: 350, mx: 'auto', mt: 5 }}>
            <Typography sx={{ mb: 2 }} variant="h5" align="left">
                Acesse sua conta
            </Typography>

            <Divider />

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={loginData.email}
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
    )
}

export default RecruiterLoginForm