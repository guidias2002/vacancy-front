import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderColor: "#87aa68",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#87aa68",
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#87aa68',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#87aa68',
                    '&.Mui-checked': {
                        color: '#87aa68',
                    },
                },
            },
        },
    },
});

export default theme;
