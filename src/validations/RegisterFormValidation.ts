import axios from 'axios';

export interface ValidationErrors {
    name?: string;
    login?: string;
    password?: string;
    email?: string;
}

interface CandidateData {
    name: string;
    login: string;
    password: string;
    email: string;
}

const API_URL = 'http://localhost:8080/candidate';

const checkUser = async (login: string, email: string) => {
    try {
        const response = await axios.get(`${API_URL}/check?login=${login}&email=${email}`);
        const { login: loginExists, email: emailExists } = response.data;
        console.log("Resposta da verificação de usuário: ", response);
        return {
            loginExists,
            emailExists
        };
    } catch (error) {
        console.log("Erro ao verificar usuário", error);
        return {
            emailExists: false,
            loginExists: false,
        };
    }
};

export const validateCandidateData = async (formData: CandidateData): Promise<ValidationErrors> => {
    const errors: ValidationErrors = {};

    // Verifica se o login e email já existem
    const { loginExists, emailExists } = await checkUser(formData.login, formData.email);

    if (!formData.name.trim()) {
        errors.name = 'Campo obrigatório.';
    }

    if (!formData.login.trim()) {
        errors.login = 'Campo obrigatório.';
    } 
    
    if (formData.login.length < 6) {
        errors.login = 'O login deve ter no mínimo 6 caracteres';
    } 
    
    if (loginExists) {
        errors.login = 'Este login já está em uso.';
    }

    if (!formData.password.trim()) {
        errors.password = 'Campo obrigatório.';
    } 
    
    if (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
        errors.password = 'A senha deve ter no mínimo 6 caracteres, uma letra maiúscula e um número';
    }

    if (!formData.email.trim()) {
        errors.email = 'Campo obrigatório.';
    } 
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'O email deve estar em um formato válido';
    } 
    
    if (emailExists) {
        errors.email = 'Este email já está em uso.';
    }

    return errors;
};
