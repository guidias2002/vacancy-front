import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


interface LoginFormData {
    email: string;
    password: string;
}

const useRecruiterLoginForm = () => {

    const URL_LOGIN_RECRUITER = 'http://localhost:8080/recruiter/login';
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginFormData>({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(URL_LOGIN_RECRUITER, loginData);
            const { userName, userId, token, accountType } = response.data;
            login(userName, userId, token, accountType);
            navigate('/dashboard-enteprise');
        } catch (error) {
            setError("Erro de autenticação. Verifique suas credenciais e tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return {
        loginData,
        handleChange,
        handleSubmit,
        error,
        loading,
    };
}

export default useRecruiterLoginForm