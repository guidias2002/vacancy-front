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
  
  export const validateCandidateData = (formData: CandidateData): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Campo obrigatório.';
    }
    
    if (!formData.login.trim()) {
      errors.login = 'Campo obrigatório.';
    } else if (formData.login.length < 6) {
      errors.login = 'O login deve ter no mínimo 6 caracteres';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Campo obrigatório.';
    } else if (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      errors.password = 'A senha deve ter no mínimo 6 caracteres, uma letra maiúscula e um número';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Campo obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'O email deve estar em um formato válido';
    }
  
    return errors;
  };
  