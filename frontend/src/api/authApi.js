import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/auth';

export const login = (correo, password) =>
  axios.post(`${BASE_URL}/login`, { correo, password });
