import axios from 'axios';

/**
 * @TODO create login page
 */
const JWT = localStorage.getItem('jwt');

const auth = JWT ? { Authorization: `Bearer ${JWT}` } : {};

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    ...auth,
  },
});

export default api;
