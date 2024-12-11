import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const URL_LOGIN_ENTEPRISE = 'http://localhost:8080/enterprise/login';

interface LoginFormData {
    loginOrEmail: string;
    password: string;
  }

const useEnterpriseLoginForm = () => {

    const [loginData, setLoginData] = useState<LoginFormData>({ loginOrEmail: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(URL_LOGIN_ENTEPRISE, loginData);
        const { userName, userId, token, accountType } = response.data;
        login(userName, userId, token, accountType); 
        navigate('/dashboard-enteprise'); 
      } catch (error) {
        setError("Erro de autenticação. Verifique suas credenciais e tente novamente.");
      } finally {
        setLoading(false);
      }
    };
  
    return {
      loginData,
      handleChange,
      handleSubmit,
      error,
      loading,
    };
}

export default useEnterpriseLoginForm;