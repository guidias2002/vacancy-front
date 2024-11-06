import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/candidate/login';

interface LoginFormData {
  loginOrEmail: string;
  password: string;
}

export const useCandidateLoginForm = () => {
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
      const response = await axios.post(API_URL, loginData);
      const { token, accountType } = response.data;
      login(token, accountType); 
      navigate('/dashboard-candidate'); 
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
};
