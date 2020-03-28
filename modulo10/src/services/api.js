import axios from 'axios';

const api = axios.create({
  baseURL: 'https://saronjs.tech/',
});

export default api;
