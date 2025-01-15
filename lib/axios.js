import axios from 'axios';

// Criar instância do axios com configuração básica
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função de autenticação (como exemplo)
api.auth = {
  getUser: async () => {
    try {
      const response = await api.get('/auth/user');  // Ajuste o endpoint conforme necessário
      return response.data;  // Retorna os dados do usuário
    } catch (error) {
      throw new Error('Erro ao obter usuário');
    }
  },
  signOut: async () => {
    try {
      await api.post('/auth/logout');  // Ajuste o endpoint conforme necessário
      localStorage.removeItem('token');  // Remove o token ao sair
    } catch (error) {
      throw new Error('Erro ao fazer logout');
    }
  }
};

// Função `from` que simula a interação com tabelas no seu backend (ajustado para o seu uso)
api.from = (table) => ({
  select: (columns) => ({
    eq: (field, value) => ({
      single: async () => {
        try {
          const response = await api.get(`/db/${table}`, {
            params: { [field]: value },
          });
          return { data: response.data, error: null }; // Retorna o resultado da consulta
        } catch (error) {
          return { data: null, error: error.message };  // Em caso de erro
        }
      }
    }),
  }),
});

export default api;

// Adicione o tipo Profile para uso em outros arquivos
const Profile = {
  id: '',
  username: '',
  email: '',
  // Adicione outros campos conforme necessário
};

export { Profile };
