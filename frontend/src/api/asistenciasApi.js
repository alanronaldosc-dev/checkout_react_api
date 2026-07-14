import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/asistencias';

export const getAll = (usuarioId = '', fecha = '') => {
  const params = {};
  if (usuarioId) params.usuarioId = usuarioId;
  if (fecha) params.fecha = fecha;
  return axios.get(BASE_URL, { params });
};

export const getById = (id) => axios.get(`${BASE_URL}/${id}`);

export const update = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
